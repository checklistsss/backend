import { ItemStatus } from '../models/ItemStatus'

export default class Item {
  constructor(
    private readonly _id: string,
    private readonly _description: string,
    private readonly _status: ItemStatus = ItemStatus.TO_DO,
  ) {}

  get id(): string {
    return this._id
  }

  get description(): string {
    return this._description
  }

  get status(): string {
    return this._status
  }
}
