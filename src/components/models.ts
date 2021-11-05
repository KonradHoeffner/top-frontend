export interface IRestriction {
  type: DataType
  minOperator?: RestrictionOperator
  maxOperator?: RestrictionOperator
  values: Array<string|number|boolean|Date>
}

export interface ICodeSystem {
  uri: string
  name: string
}
export interface ICode {
  codeSystem: ICodeSystem
  code: string
  name: string
}

export interface IExpression {
  type: ExpressionType
  id?: string|number
  operands?: IExpression[]
}

export enum EntityType {
  Category            = 'category',
  MissingValue        = 'missing_value',
  PhenotypeGroup      = 'phenotype_group',
  SinglePhenotype     = 'single_phenotype',
  CombinedPhenotype   = 'combined_phenotype',
  DerivedPhenotype    = 'derived_phenotype',
  SingleRestriction   = 'single_restriction',
  CombinedRestriction = 'combined_restriction',
  DerivedRestriction  = 'derived_restriction'
}

export enum DataType {
  String   = 'string',
  Number   = 'number',
  Boolean  = 'boolean',
  DateTime = 'dateTime'
}

export enum ExpressionType {
  Class        = 'class',
  Restriction  = 'restriction',
  Union        = 'union',
  Intersection = 'intersection',
  Complement   = 'complement'
}

export enum RestrictionOperator {
  LowerThan    = '<',
  LowerEqual   = '≤',
  Equal        = '=',
  GreaterEqual = '≥',
  GreaterThan  = '>'
}
