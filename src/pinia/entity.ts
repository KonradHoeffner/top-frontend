import { KeycloakInstance } from '@dsb-norge/vue-keycloak-js/dist/types'
import { BooleanRestriction, Category, DateTimeRestriction, Entity, EntityApi, EntityType, ExpressionFunction, ExpressionFunctionApi, ForkApi, NumberRestriction, Phenotype, StringRestriction, ForkCreateInstruction, RepositoryApi, Repository, DataType, Organisation, OrganisationApi, ExpressionConstantApi, Constant } from '@onto-med/top-api'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useEntity = defineStore('entity', {
  state: () => {
    return {
      organisationId: undefined as string|undefined,
      repositoryId: undefined as string|undefined,
      organisation: undefined as Organisation|undefined,
      repository: undefined as Repository|undefined,
      entities: [] as Entity[],
      constants: undefined as Constant[]|undefined,
      functions: new Map<string, ExpressionFunction[]>(),
      keycloak: undefined as KeycloakInstance|undefined,
      entityApi: undefined as EntityApi|undefined,
      expressionConstantApi: undefined as ExpressionConstantApi|undefined,
      expressionFunctionApi: undefined as ExpressionFunctionApi|undefined,
      organisationApi: undefined as OrganisationApi|undefined,
      repositoryApi: undefined as RepositoryApi|undefined,
      forkApi: undefined as ForkApi|undefined
    }
  },
  actions: {
    async reloadEntities () {
      if (!this.organisationId || !this.repositoryId)
        throw {
          name: 'MissingParametersException',
          message: 'organisationId or repositoryId missing'
        }
      await this.entityApi?.getEntitiesByRepositoryId(this.organisationId, this.repositoryId)
        .then((r) => this.entities = r.data)
    },

    async reloadConstants () {
      await this.expressionConstantApi?.getConstants()
        .then(r => this.constants = r.data)
    },

    async reloadFunctionsByType (type: string) {
      await this.expressionFunctionApi?.getExpressionFunctions(type)
        .then((r) => this.functions.set(type, r.data))
    },

    async reloadFunctions () {
      await this.reloadFunctionsByType('math')
      await this.reloadFunctionsByType('boolean')
    },

    async setOrganisation (organisationId: string|undefined) {
      this.organisationId = organisationId
      if (!organisationId) {
        this.organisation = undefined
        return
      }
      await this.organisationApi?.getOrganisationById(organisationId)
        .then(r => this.organisation = r.data)
    },

    async setRepository (repositoryId: string|undefined) {
      this.repositoryId = repositoryId
      if (!repositoryId) {
        this.repository = undefined
        return
      }
      if (!this.organisationId) return
      await this.repositoryApi?.getRepositoryById(this.organisationId, repositoryId, undefined)
        .then(r => this.repository = r.data)
    },

    async getConstants (): Promise<Constant[]> {
      if (!this.constants)
        await this.reloadConstants()
      return this.constants || []
    },

    async getFunctions (type: string): Promise<ExpressionFunction[]> {
      if (!this.functions.get(type))
        await this.reloadFunctionsByType(type)
      return this.functions.get(type) || []
    },

    getEntity (id: string|undefined): Entity|undefined {
      return this.entities.find(e => e.id === id)
    },

    addEntity (entityType: EntityType, superClassId: string): Entity {
      const entity = { id: (uuidv4 as () => string)(), entityType: entityType } as Entity

      const superClass = this.getEntity(superClassId)
      if (superClass && [ EntityType.SinglePhenotype, EntityType.DerivedPhenotype ].includes(superClass.entityType)) {
        (entity as Phenotype).dataType = (superClass as Phenotype).dataType || DataType.Number
        if (this.hasRestriction(entity))
          entity.restriction = { type: entity.dataType } as NumberRestriction|StringRestriction|BooleanRestriction|DateTimeRestriction
      }

      if (superClass) {
        const short = { id: superClass.id, entityType: superClass.entityType } as Entity
        if (this.isPhenotype(superClass)) {
          (entity as Phenotype).superPhenotype = short
        } else {
          (entity as Category).superCategories = [ short ]
        }
      }
      this.entities.push(entity)

      return entity
    },

    addDuplicate (entity: Entity): Entity {
      const duplicate = JSON.parse(JSON.stringify(entity)) as Entity
      duplicate.id = (uuidv4 as () => string)()
      duplicate.version = undefined
      duplicate.createdAt = undefined
      duplicate.author = undefined
      this.entities.push(duplicate)
      return duplicate
    },

    async forkEntity (entity: Entity) {
      if (!this.forkApi || !entity.id || !entity.repository || !entity.repository.organisation) return

      return this.forkApi.createFork(
        entity.repository.organisation.id,
        entity.repository.id,
        entity.id,
        {
          organisationId: this.organisationId,
          repositoryId: this.repositoryId
        } as ForkCreateInstruction,
        undefined,
        entity.version
      ).then(r => r.data.forEach(e => this.addOrReplaceEntity(e)))
    },

    addOrReplaceEntity (entity: Entity): void {
      const index = this.entities.findIndex(e => e.id === entity.id)
      if (index !== -1) this.entities.splice(index, 1)
      this.entities.push(entity)
    },

    async saveEntity (entity: Entity) {
      if (!entity || !this.entityApi || !this.organisationId || !this.repositoryId)
        throw {
          name: 'MissingAttributesException',
          message: 'attributesMissing'
        }

      let promise: Promise<AxiosResponse<Entity>>
      if (!entity.createdAt) {
        promise = this.entityApi.createEntity(this.organisationId, this.repositoryId, entity)
      } else {
        promise = this.entityApi.updateEntityById(this.organisationId, this.repositoryId, entity.id as string, entity)
      }

      return promise
        .then((r) => {
          const existing = this.getEntity(r.data.id)
          if (existing)
            return Object.assign(existing, r.data)
          else {
            this.entities.push(r.data)
            return this.getEntity(r.data.id) as Entity
          }
        })
    },

    async deleteEntity (entity: Entity) {
      const index = this.entities.findIndex(e => e.id === entity.id)
      if (index === -1) return

      if (entity.version) {
        if (!this.organisationId || !this.repositoryId || !entity.id)
          throw {
            name: 'MissingAttributesException',
            message: 'attributesMissing'
          }
        await this.entityApi?.deleteEntityById(this.organisationId, this.repositoryId, entity.id)
          .then(() => this.entities.splice(index, 1))
      } else {
        this.entities.splice(index, 1)
      }

      if (this.isCategory(entity)) {
        this.entities.filter((e: Category|Phenotype) => this.hasSuperCategory(e, entity)).forEach((e: Category|Phenotype) => {
          e.superCategories = e.superCategories?.filter(c => c.id !== entity.id)
          if (entity.superCategories) e.superCategories?.push(...(entity.superCategories))
        })
      } else if (this.isPhenotype(entity)) {
        this.entities = this.entities.filter((p: Phenotype) => p.superPhenotype?.id !== entity.id)
      }
    },

    async deleteVersion (entity: Entity) {
      if (!entity || !this.entityApi || !this.organisationId || !this.repositoryId)
        throw {
          name: 'MissingAttributesException',
          message: 'attributesMissing'
        }

      await this.entityApi.deleteEntityById(this.organisationId, this.repositoryId, entity.id as string, entity.version as number, undefined, undefined)
    },

    async restoreVersion (entity: Entity) {
      if (!entity || !this.entityApi || !this.organisationId || !this.repositoryId)
        throw {
          name: 'MissingAttributesException',
          message: 'attributesMissing'
        }

      await this.entityApi.setCurrentEntityVersion(this.organisationId, this.repositoryId, entity.id as string, entity.version as number, undefined, undefined)
        .then(() => {
          const old = this.entities.find(e => e.id == entity.id)
          if (old) Object.assign(old, entity)
        })
    },

    hasSuperCategory (entity: Category|Phenotype, category: Category): boolean {
      return entity.superCategories?.findIndex(c => c.id === category.id) !== -1
    },

    isCategory (entity: Entity): entity is Category {
      return EntityType.Category === entity.entityType
    },

    isPhenotype (entity: Entity): entity is Phenotype {
      return [EntityType.SinglePhenotype, EntityType.CombinedPhenotype, EntityType.DerivedPhenotype].includes(entity.entityType)
    },

    hasRestriction (entity: Entity): entity is Phenotype {
      return [EntityType.SingleRestriction, EntityType.DerivedRestriction].includes(entity.entityType)
    }
  }
})
