import { DbItemCollection } from 'src/domain/dtos/db/DbItemCollection.dto'
import ItemCollection from 'src/domain/models/ItemCollection'
import Serializer from '../Serializer'
import { ItemDbSerializer } from './ItemDbSerializer'

export class ItemCollectionDbSerializer
  implements Serializer<ItemCollection, DbItemCollection>
{
  constructor(private readonly itemDbSerializer: ItemDbSerializer) {}

  toJSON(itemCollection: ItemCollection): DbItemCollection {
    return itemCollection.items.reduce((collection, item) => {
      collection[item.id] = this.itemDbSerializer.toJSON(item)
      return collection
    }, {} as DbItemCollection)
  }
}
