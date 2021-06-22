import { Nullable } from 'src/utils/types'
import Item from './Item'

export default class ItemCollection {
  constructor(private _items: Item[] = []) {}

  add(item: Item) {
    this._items.push(item)
  }

  findById(itemId: string): Nullable<Item> {
    return this._items.find((i) => i.id === itemId)
  }

  get items(): Item[] {
    return [...this._items]
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
}
