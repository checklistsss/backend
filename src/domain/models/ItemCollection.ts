import { Nullable } from 'src/utils/types'
import { PublicItemData } from '../interfaces/Item.dto'
import Item from './Item'
import JSONSerializable from './Serializable'

export default class ItemCollection
  implements JSONSerializable<PublicItemData[]>
{
  constructor(private _items: Item[] = []) {}

  add(item: Item) {
    this._items.push(item)
  }

  findById(itemId: string): Nullable<Item> {
    return this._items.find((i) => i.id === itemId)
  }

  private findIndexById(itemId: string): Nullable<number> {
    return this._items.findIndex((i) => i.id === itemId) ?? null
  }

  removeById(itemId: string): void {
    const itemIndex = this.findIndexById(itemId)

    if (itemIndex < 0) {
      throw new Error(`Item with id "${itemId}" was not found`)
    }

    this._items.splice(itemIndex, 1)
  }

  toJSON(): PublicItemData[] {
    return this._items.map((i) => i.toJSON())
  }
}
