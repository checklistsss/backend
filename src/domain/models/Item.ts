import { v4 as uuid } from 'uuid'
import { ItemStatus } from '../models/ItemStatus'
import { CreateItemPayload } from '../interfaces/CreateItem.dto'

export default class Item {
  constructor(
    private _id: string,
    private _description: string,
    private _status: ItemStatus = ItemStatus.TO_DO,
  ) {}

  static fromCreateItemPayload(createItemPayload: CreateItemPayload) {
    return new Item(uuid(), createItemPayload.description)
  }

  set id(value: string) {
    this._id = value
  }

  get id() {
    return this._id
  }

  set description(value: string) {
    this._description = value
  }

  get description() {
    return this._description
  }

  set status(value: ItemStatus) {
    this._status = value
  }

  get status() {
    return this._status
  }
}
