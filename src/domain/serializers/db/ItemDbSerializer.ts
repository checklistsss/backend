import { Injectable } from '@nestjs/common'
import { DbItem } from 'src/domain/dtos/db/DbItem.dto'
import Item from 'src/domain/models/Item'
import Serializer from '../Serializer'

@Injectable()
export class ItemDbSerializer implements Serializer<Item, DbItem> {
  toJSON(item: Item): DbItem {
    return {
      id: item.id,
      description: item.description,
      status: item.status.toString(),
    }
  }
}
