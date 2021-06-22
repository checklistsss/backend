import { Injectable } from '@nestjs/common'
import { ItemCollectionApiModel } from 'src/domain/interfaces/ItemCollectionApiModel.dto'
import ItemCollection from 'src/domain/models/ItemCollection'
import Serializer from '../Serializer'
import { ItemApiSerializer } from './ItemApiSerializer'

@Injectable()
export class ItemCollectionApiSerializer implements Serializer<ItemCollection, ItemCollectionApiModel> {
  constructor(private readonly itemSerializer: ItemApiSerializer) {}

  toJSON(itemCollection: ItemCollection): ItemCollectionApiModel {
    return itemCollection.items.map((item) => this.itemSerializer.toJSON(item))
  }
}