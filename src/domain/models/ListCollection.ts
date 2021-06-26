import { Nullable } from 'src/utils/types'
import List from './List'

export default class ListCollection {
  constructor(private readonly _lists: List[] = []) {}

  get lists(): List[] {
    return [...this._lists]
  }

  add(item: List): void {
    this._lists.push(item)
  }

  findById(listId: string): Nullable<List> {
    return this._lists.find((l) => l.id === listId) || null
  }
}
