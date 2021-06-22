import { ItemCollectionDbModel } from './ItemCollectionDbModel.dto';

export interface ListDBModel {
  listId: string 
  userId: string
  title: string
  items: ItemCollectionDbModel,
}
