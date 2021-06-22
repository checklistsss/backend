import { v4 as uuid } from 'uuid'
import { Nullable } from 'src/utils/types'
import { CreateListPayload } from '../interfaces/CreateList.dto'
import Item from './Item'
import ItemCollection from './ItemCollection'

export default class List {
  constructor(
    private _id: string,
    private _userId: string,
    private _title: string,
    private _items: ItemCollection = new ItemCollection(),
  ) {}

  static fromCreateListPayload(userId: string, createListPayload: CreateListPayload) {
    return new List(uuid(), userId, createListPayload.title)
  }

  set id(value: string) {
    this._id = value
  }

  get id() {
    return this._id
  }

  set userId(value: string) {
    this._userId = value
  }

  get userId() {
    return this._userId
  }

  set title(value: string) {
    this._title = value
  }

  get title() {
    return this._title
  }

  get items() {
    return this._items
  }

  addItem(item: Item): List {
    this._items.add(item)
    return this
  }

  findItemById(itemId: string): Nullable<Item> {
    return this._items.findById(itemId)
  }

  removeItemById(itemId: string): void {
    this._items.removeById(itemId)
  }
}
