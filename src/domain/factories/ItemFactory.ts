import { v4 as uuid } from 'uuid'
import { ApiCreateItem } from '../dtos/api/ApiCreateItem.dto'
import { DbItem } from '../dtos/db/DbItem.dto'
import Item from '../models/Item'
import { ItemStatus } from '../models/ItemStatus'

const isValidStatusEnumValue = (status: string): boolean => 
  Object.values(ItemStatus).includes(status as ItemStatus)

export class ItemFactory {
  fromCreateListApiModel(createItemApiModel: ApiCreateItem) {
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

  fromDbModel(itemDbModel: DbItem) {
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