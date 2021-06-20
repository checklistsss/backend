import { Injectable } from '@nestjs/common'
import Item from '../models/Item'
import List from '../models/List'
import ListCollection from '../models/ListCollection'

const lists: ListCollection = new ListCollection()

@Injectable()
export class ListsRepo {
  insertItem(listId: string, item: Item): Promise<List> {
    const list = lists.findById(listId)

    if (!list) {
      throw new Error('List not found')
    }

    list.addItem(item)
    return Promise.resolve(list)
  }

  async deleteItem(listId: string, itemId: string): Promise<List> {
    const list = await this.findListById(listId)
    list.removeItemById(itemId)

    return list
  }

  async findListById(listId: string): Promise<List> {
    const list = lists.findById(listId)

    if (!list) {
      throw new Error(`List with id "${listId}" was not found`)
    }

    return list
  }

  async insertList(list: List): Promise<List> {
    lists.add(list)
    return list
  }

  async findLists(): Promise<ListCollection> {
    return lists
  }
}
