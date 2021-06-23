import { v4 as uuid } from 'uuid'
import { ItemStatus } from '../models/ItemStatus'
import { CreateItem } from '../interfaces/CreateItem.dto'

export default class Item {
  constructor(
    private readonly _id: string,
    private readonly _description: string,
    private readonly _status: ItemStatus = ItemStatus.TO_DO,
  ) {}

  get id() {
    return this._id
  }

  get description() {
    return this._description
  }

  get status() {
    return this._status
  }
}
