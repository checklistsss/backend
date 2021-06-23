import { Injectable } from '@nestjs/common'
import { ApiItem } from 'src/domain/dtos/api/ApiItem.dto'
import Item from 'src/domain/models/Item'
import Serializer from '../Serializer'

@Injectable()
export class ItemApiSerializer implements Serializer<Item, ApiItem> {
  toJSON(item: Item): ApiItem {
    return {
      id: item.id,
      description: item.description,
      status: item.status.toString(),
    }
  }
}