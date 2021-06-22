import { Injectable } from '@nestjs/common'
import { ListApiModel } from 'src/domain/interfaces/ListApiModel.dto'
import List from 'src/domain/models/List'
import Serializer from '../Serializer'
import { ItemCollectionApiSerializer } from './ItemCollectionApiSerializer'

@Injectable()
export class ListApiSerializer implements Serializer<List, ListApiModel> {
  constructor(
    private readonly itemCollectionApiSerializer: ItemCollectionApiSerializer,
  ) {}

  toJSON(list: List): ListApiModel {
    return {
      id: list.id,
      userId: list.userId,
      title: list.title,
      items: this.itemCollectionApiSerializer.toJSON(list.items),
    }
  }
}