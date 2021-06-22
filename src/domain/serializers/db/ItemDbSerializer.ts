import { Injectable } from '@nestjs/common'
import { ItemDBModel } from 'src/domain/interfaces/ItemDbModel.dto'
import Item from 'src/domain/models/Item'
import Serializer from '../Serializer'

@Injectable()
export class ItemDbSerializer implements Serializer<Item, ItemDBModel> {
  toJSON(item: Item): ItemDBModel {
    return {
      id: item.id,
      description: item.description,
      status: item.status.toString(),
    }
  }
}