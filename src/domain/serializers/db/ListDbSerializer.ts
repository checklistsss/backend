import { Injectable } from '@nestjs/common'
import { DbList } from 'src/domain/dtos/db/DbList.dto'
import List from 'src/domain/models/List'
import Serializer from '../Serializer'
import { ItemCollectionDbSerializer } from './ItemCollectionDbSerializer'

@Injectable()
export class ListDbSerializer implements Serializer<List, DbList> {
  constructor(
    private readonly itemCollectionDbSerializer: ItemCollectionDbSerializer,
  ) {}

  toJSON(list: List): DbList {
    return {
      listId: list.id,
      userId: list.userId,
      title: list.title,
      items: this.itemCollectionDbSerializer.toJSON(list.items),
    }
  }
}
