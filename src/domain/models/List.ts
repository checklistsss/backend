import { Nullable } from 'src/utils/types'
import Item from './Item'
import ItemCollection from './ItemCollection'

export default class List {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _title: string,
    private readonly _items: ItemCollection = new ItemCollection(),
  ) {}

  get id(): string {
    return this._id
  }

  get userId(): string {
    return this._userId
  }

  get title(): string {
    return this._title
  }

  get items(): ItemCollection {
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
