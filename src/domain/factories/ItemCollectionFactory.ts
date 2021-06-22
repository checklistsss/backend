import { Injectable } from '@nestjs/common'
import { ItemCollectionDbModel } from '../interfaces/ItemCollectionDbModel.dto'
import ItemCollection from '../models/ItemCollection'
import { ItemFactory } from './ItemFactory'

@Injectable()
export class ItemCollectionFactory {
  constructor(
    private readonly itemFactory: ItemFactory,
  ) {}
  fromDbCollection(
    itemCollectionDbModel: ItemCollectionDbModel
  ): ItemCollection {
    const items = Object.values(itemCollectionDbModel)
      .map(i => this.itemFactory.fromDbModel(i))

    return new ItemCollection(items)
  }
}