import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { ApiCreateList } from '../dtos/api/ApiCreateList.dto'
import { DbList } from '../dtos/db/DbList.dto'
import List from '../models/List'
import { ItemCollectionFactory } from './ItemCollectionFactory'

@Injectable()
export class ListFactory {
  constructor(private readonly itemCollectionFactory: ItemCollectionFactory) {}

  fromCreateListApiModel(
    userId: string,
    createListApiModel: ApiCreateList,
  ): List {
    return new List(uuid(), userId, createListApiModel.title)
  }

  fromDbModel(listDbModel: DbList): List {
    return new List(
      listDbModel.listId,
      listDbModel.userId,
      listDbModel.title,
      this.itemCollectionFactory.fromDbCollection(listDbModel.items),
    )
  }
}
