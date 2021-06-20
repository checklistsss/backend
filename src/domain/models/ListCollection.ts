import { Nullable } from 'src/utils/types'
import { PublicListData } from '../interfaces/List.dto'
import List from './List'
import JSONSerializable from './Serializable'

export default class ListCollection
  implements JSONSerializable<PublicListData[]>
{
  constructor(private _lists: List[] = []) {}

  add(item: List) {
    this._lists.push(item)
  }

  findById(listId: string): Nullable<List> {
    return this._lists.find((l) => l.id === listId) || null
  }

  toJSON(): PublicListData[] {
    return this._lists.map((i) => i.toJSON())
  }
}
