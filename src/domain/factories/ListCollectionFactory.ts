import { Injectable } from '@nestjs/common'
import { ListCollectionDbModel } from '../interfaces/ListCollectionDbModel.dto'
import ListCollection from '../models/ListCollection'
import { ListFactory } from './ListFactory'

@Injectable()
export class ListCollectionFactory {
  constructor(
    private readonly listFactory: ListFactory,
  ) {}

  fromDbCollection(
    itemCollectionDbModel: ListCollectionDbModel
  ): ListCollection {
    const items = Object.values(itemCollectionDbModel)
      .map(i => this.listFactory.fromDbModel(i))

    return new ListCollection(items)
  }
}