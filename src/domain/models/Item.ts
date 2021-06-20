import { v4 as uuid } from 'uuid'
import { ItemStatus } from '../models/ItemStatus'
import { CreateItemPayload } from '../interfaces/CreateItem.dto'
import { PublicItemData } from '../interfaces/Item.dto'
import JSONSerializable from './Serializable'

export default class Item implements JSONSerializable<PublicItemData> {
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

  toJSON(): PublicItemData {
    return {
      id: this.id,
      description: this.description,
      status: this.status,
    }
  }
}
