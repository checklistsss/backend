import { Injectable } from '@nestjs/common'
import { DbListCollection } from '../dtos/db/DbListCollection.dto'
import ListCollection from '../models/ListCollection'
import { ListFactory } from './ListFactory'

@Injectable()
export class ListCollectionFactory {
  constructor(
    private readonly listFactory: ListFactory,
  ) {}

  fromDbCollection(
    itemCollectionDbModel: DbListCollection
  ): ListCollection {
    const items = Object.values(itemCollectionDbModel)
      .map(i => this.listFactory.fromDbModel(i))

    return new ListCollection(items)
  }
}