import { Injectable } from '@nestjs/common'
import { DbItemCollection } from '../dtos/db/DbItemCollection.dto'
import ItemCollection from '../models/ItemCollection'
import { ItemFactory } from './ItemFactory'

@Injectable()
export class ItemCollectionFactory {
  constructor(
    private readonly itemFactory: ItemFactory,
  ) {}

  fromDbCollection(
    itemCollectionDbModel: DbItemCollection
  ): ItemCollection {
    const items = Object.values(itemCollectionDbModel)
      .map(i => this.itemFactory.fromDbModel(i))

    return new ItemCollection(items)
  }
}