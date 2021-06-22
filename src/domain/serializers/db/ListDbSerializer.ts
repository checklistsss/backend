import { Injectable } from '@nestjs/common'
import { ListDBModel } from 'src/domain/interfaces/ListDBModel.dto'
import List from 'src/domain/models/List'
import Serializer from '../Serializer'
import { ItemCollectionDbSerializer } from './ItemCollectionDbSerializer'

@Injectable()
export class ListDbSerializer implements Serializer<List, ListDBModel> {
  constructor(
    private readonly itemCollectionDbSerializer: ItemCollectionDbSerializer,
  ) {}

  toJSON(list: List): ListDBModel {
    return {
      listId: list.id,
      userId: list.userId,
      title: list.title,
      items: this.itemCollectionDbSerializer.toJSON(list.items),
    }
  }
}