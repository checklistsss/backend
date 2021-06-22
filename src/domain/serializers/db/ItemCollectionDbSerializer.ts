import { ItemCollectionDbModel } from 'src/domain/interfaces/ItemCollectionDbModel.dto'
import ItemCollection from 'src/domain/models/ItemCollection'
import Serializer from '../Serializer'
import { ItemDbSerializer } from './ItemDbSerializer'

export class ItemCollectionDbSerializer implements Serializer<ItemCollection, ItemCollectionDbModel> {
  constructor(private readonly itemDbSerializer: ItemDbSerializer) {}

  toJSON(itemCollection: ItemCollection): ItemCollectionDbModel {
    return itemCollection.items.reduce((collection, item) => {
      collection[item.id] = this.itemDbSerializer.toJSON(item)
      return collection
    }, {} as ItemCollectionDbModel)
  }
}