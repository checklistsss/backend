import { Injectable } from '@nestjs/common'
import { ApiItemCollection } from 'src/domain/dtos/api/ApiItemCollection.dto'
import ItemCollection from 'src/domain/models/ItemCollection'
import Serializer from '../Serializer'
import { ItemApiSerializer } from './ItemApiSerializer'

@Injectable()
export class ItemCollectionApiSerializer implements Serializer<ItemCollection, ApiItemCollection> {
  constructor(private readonly itemSerializer: ItemApiSerializer) {}

  toJSON(itemCollection: ItemCollection): ApiItemCollection {
    return itemCollection.items.map((item) => this.itemSerializer.toJSON(item))
  }
}