import { Nullable } from 'src/utils/types'
import Item from './Item'
import { ItemStatus } from './ItemStatus'

export default class ItemCollection {
  constructor(private readonly _items: Item[] = []) {}

  add(item: Item): void {
    this._items.push(item)
  }

  findById(itemId: string): Nullable<Item> {
    return this._items.find((i) => i.id === itemId)
  }

  get length(): number {
    return this._items.length
  }

  get percentageDone(): number {
    if (!this.length) {
      return 0
    }

    const done = this._items.filter((i) => i.status === ItemStatus.DONE)
    return (done.length / this.length) * 100
  }

  get items(): Item[] {
    return [...this._items]
  }

  private findIndexById(itemId: string): Nullable<number> {
    return this._items.findIndex((i) => i.id === itemId)
  }

  removeById(itemId: string): void {
    const itemIndex = this.findIndexById(itemId)

    if (itemIndex < 0) {
      throw new Error(`Item with id "${itemId}" was not found`)
    }

    this._items.splice(itemIndex, 1)
  }
}
