import { v4 as uuid } from 'uuid'
import { CreateItemPayload } from '../interfaces/CreateItem.dto'
import { ItemDBModel } from '../interfaces/ItemDbModel.dto'
import Item from '../models/Item'
import { ItemStatus } from '../models/ItemStatus'

const isValidStatusEnumValue = (status: string): boolean => 
  Object.values(ItemStatus).includes(status as ItemStatus)

export class ItemFactory {
  fromCreateListApiModel(createItemApiModel: CreateItemPayload) {
    const { status } =  createItemApiModel

    if (status && !isValidStatusEnumValue(status)) {
      throw new Error(`"${status}" is an invalid \`status\` enum value`)
    }
    
    return new Item(
      uuid(),
      createItemApiModel.description,
      status,
    )
  }

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