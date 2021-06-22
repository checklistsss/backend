import { Injectable } from '@nestjs/common';
import { ListDBModel } from '../interfaces/ListDBModel.dto';
import List from '../models/List';
import { ItemCollectionFactory } from './ItemCollectionFactory';

@Injectable()
export class ListFactory {
  constructor(
    private readonly itemCollectionFactory: ItemCollectionFactory,
  ) {}
  fromDbModel(listDbModel: ListDBModel) {
    return new List(
      listDbModel.listId,
      listDbModel.userId,
      listDbModel.title,
      this.itemCollectionFactory.fromDbCollection(listDbModel.items),
    )
  }
}