import { ItemCollectionDbModel } from './ItemCollectionDbModel.dto';

export abstract class ListDBModel {
  listId: string 
  userId: string
  title: string
  items: ItemCollectionDbModel
}
