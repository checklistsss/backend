import { Nullable } from 'src/utils/types'
import { PublicListData } from '../interfaces/List.dto'
import List from './List'

export default class ListCollection {
  constructor(private _lists: List[] = []) {}

  static fromJSON(lists: PublicListData[]): ListCollection{
    return new ListCollection(
      lists.map(list => List.fromJSON(list))  
    )
  }

  get lists(): List[] {
    return [...this._lists]
  }

  add(item: List) {
    this._lists.push(item)
  }

  findById(listId: string): Nullable<List> {
    return this._lists.find((l) => l.id === listId) || null
  }
}
