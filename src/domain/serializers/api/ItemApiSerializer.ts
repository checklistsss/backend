import { Injectable } from '@nestjs/common'
import { ItemApiModel } from 'src/domain/interfaces/ItemApiModel.dto'
import Item from 'src/domain/models/Item'
import Serializer from '../Serializer'

@Injectable()
export class ItemApiSerializer implements Serializer<Item, ItemApiModel> {
  toJSON(item: Item): ItemApiModel {
    return {
      id: item.id,
      description: item.description,
      status: item.status.toString(),
    }
  }
}