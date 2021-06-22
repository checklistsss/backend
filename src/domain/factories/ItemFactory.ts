import { ItemDBModel } from '../interfaces/ItemDbModel.dto'
import Item from '../models/Item'
import { ItemStatus } from '../models/ItemStatus'

const isValidStatusEnumValue = (status: string): boolean => 
  Object.values(ItemStatus).includes(status as ItemStatus)

export class ItemFactory {
  fromDbModel(itemDbModel: ItemDBModel) {
    if (!isValidStatusEnumValue(itemDbModel.status)) {
      throw new Error(`"${itemDbModel.status}" is an invalid \`status\` enum value`)
    }

    return new Item(
      itemDbModel.id,
      itemDbModel.description,
      itemDbModel.status as ItemStatus,
    )
  }
}