import { DbItemCollection } from './DbItemCollection.dto';

export abstract class DbList {
  listId: string 
  userId: string
  title: string
  items: DbItemCollection
}
