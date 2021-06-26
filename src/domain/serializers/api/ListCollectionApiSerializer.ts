import { Injectable } from '@nestjs/common'
import { ApiListCollection } from 'src/domain/dtos/api/ApiListCollection.dto'
import ListCollection from 'src/domain/models/ListCollection'
import Serializer from '../Serializer'
import { ListApiSerializer } from './ListApiSerializer'

@Injectable()
export class ListCollectionApiSerializer
  implements Serializer<ListCollection, ApiListCollection>
{
  constructor(private readonly listSerializer: ListApiSerializer) {}

  toJSON(listCollection: ListCollection): ApiListCollection {
    return listCollection.lists.map((item) => this.listSerializer.toJSON(item))
  }
}
