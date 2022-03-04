import { Category, Entity, EntityApi, EntityType, Phenotype } from '@onto-med/top-api'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

const entityApi = new EntityApi()

export const useEntity = defineStore('entity', {
  state: () => {
    return {
      organisationId: undefined as string|undefined,
      repositoryId: undefined as string|undefined,
      entities: [] as Entity[],
    }
  },
  actions: {
    async reloadEntities () {
      if (!this.organisationId || !this.repositoryId)
        throw {
          name: 'MissingParametersException',
          message: 'organisationId or repositoryId missing'
        }
      await entityApi.getRootEntitiesByRepositoryId(this.organisationId, this.repositoryId)
        .then((r) => this.entities = r.data)
    },

    getEntity (id: string|number|undefined): Entity|undefined {
      const find = (result: unknown, node: unknown): unknown => {
        if (result || !node) return result
        if (Array.isArray(node) === true)
          return [].reduce.call(Object(node), find, result)
        if ((node as Record<string, unknown>).id === id)
          return node
        if ((node as Record<string, unknown>).subCategories)
          result = find(null, (node as Record<string, unknown>).subCategories)
        if (result) return result
        if ((node as Record<string, unknown>).phenotypes)
          return find(null, (node as Record<string, unknown>).phenotypes)
        return result
      }

      const result = find(null, this.entities)
      return result ? result as Entity : undefined
    },

    addEntity (entityType: EntityType, superClassId: string): Entity {
      const entity = { id: (uuidv4 as () => string)(), entityType: entityType } as Entity

      const superClass = this.getEntity(superClassId)
      if (superClass && superClass.entityType === EntityType.SinglePhenotype)
        (entity as Phenotype).dataType = (superClass as Phenotype).dataType

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

    async saveEntity (entity: Entity) {
      if (!entity || !entityApi || !this.organisationId || !this.repositoryId)
        throw {
          name: 'MissingAttributesException',
          message: 'attributesMissing'
        }

      if (!entity.createdAt) {
        return entityApi.createEntity(this.organisationId, this.repositoryId, entity)
      }
      return entityApi.updateEntityById(this.organisationId, this.repositoryId, entity.id as string, entity)
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
        await entityApi.deleteEntityById(this.organisationId, this.repositoryId, entity.id)
          .then(() => this.entities.splice(index, 1))
      } else {
        this.entities.splice(index, 1)
      }
    },

    isPhenotype (entity: Entity): entity is Phenotype {
      return [EntityType.SinglePhenotype, EntityType.CombinedPhenotype, EntityType.DerivedPhenotype].includes(entity.entityType)
    },
  }
})
