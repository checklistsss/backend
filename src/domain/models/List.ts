import { v4 as uuid } from 'uuid'
import { Nullable } from 'src/utils/types'
import { CreateListPayload } from '../interfaces/CreateList.dto'
import { PublicListData } from '../interfaces/List.dto'
import Item from './Item'
import ItemCollection from './ItemCollection'
import JSONSerializable from './Serializable'

export default class List implements JSONSerializable<PublicListData> {
  constructor(
    private _id: string,
    private readonly _userId: string,
    private _title: string,
    private _items: ItemCollection = new ItemCollection(),
  ) {}

  static fromCreateListPayload(userId: string, createListPayload: CreateListPayload) {
    return new List(uuid(), userId, createListPayload.title)
  }

  static fromJSON(list: PublicListData): List{
    return new List(list.listId, list.userId, list.title)
  }

  set id(value: string) {
    this._id = value
  }

  get id() {
    return this._id
  }

  set title(value: string) {
    this._title = value
  }

  get title() {
    return this._title
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

  toJSON(): PublicListData {
    return {
      listId: this.id,
      userId: this._userId,
      title: this.title,
      items: this._items.toJSON(),
    }
  }
}
