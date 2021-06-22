import { ItemDBModel } from './ItemDbModel.dto'

export type ItemCollectionDbModel = {
  [key: string]: ItemDBModel,
}