import { Injectable } from '@nestjs/common'
import { ListCollectionApiModel } from 'src/domain/interfaces/ListCollectionApiModel.dto'
import ListCollection from 'src/domain/models/ListCollection'
import Serializer from '../Serializer'
import { ListApiSerializer } from './ListApiSerializer'

@Injectable()
export class ListCollectionApiSerializer implements Serializer<ListCollection, ListCollectionApiModel> {
  constructor(private readonly listSerializer: ListApiSerializer) {}

  toJSON(listCollection: ListCollection): ListCollectionApiModel {
    return listCollection.lists.map((item) => this.listSerializer.toJSON(item))
  }
}