import { v4 as uuid } from 'uuid'
import { Nullable } from 'src/utils/types'
import { CreateListPayload } from '../interfaces/CreateList.dto'
import Item from './Item'
import ItemCollection from './ItemCollection'

export default class List {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _title: string,
    private readonly _items: ItemCollection = new ItemCollection(),
  ) {}

  get id() {
    return this._id
  }

  get userId() {
    return this._userId
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
