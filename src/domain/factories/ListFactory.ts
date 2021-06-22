import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { CreateListPayload } from '../interfaces/CreateList.dto'
import { ListDBModel } from '../interfaces/ListDBModel.dto'
import List from '../models/List'
import { ItemCollectionFactory } from './ItemCollectionFactory'

@Injectable()
export class ListFactory {
  constructor(
    private readonly itemCollectionFactory: ItemCollectionFactory,
  ) {}

  fromCreateListApiModel(userId: string, createListApiModel: CreateListPayload) {
    return new List(
      uuid(),
      userId,
      createListApiModel.title,
    )    
  }

  fromDbModel(listDbModel: ListDBModel) {
    return new List(
      listDbModel.listId,
      listDbModel.userId,
      listDbModel.title,
      this.itemCollectionFactory.fromDbCollection(listDbModel.items),
    )
  }
}