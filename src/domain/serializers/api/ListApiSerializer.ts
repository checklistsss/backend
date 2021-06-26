import { Injectable } from '@nestjs/common'
import { ApiList } from 'src/domain/dtos/api/ApiList.dto'
import List from 'src/domain/models/List'
import Serializer from '../Serializer'
import { ItemCollectionApiSerializer } from './ItemCollectionApiSerializer'

@Injectable()
export class ListApiSerializer implements Serializer<List, ApiList> {
  constructor(
    private readonly itemCollectionApiSerializer: ItemCollectionApiSerializer,
  ) {}

  toJSON(list: List): ApiList {
    return {
      id: list.id,
      userId: list.userId,
      title: list.title,
      items: this.itemCollectionApiSerializer.toJSON(list.items),
    }
  }
}
