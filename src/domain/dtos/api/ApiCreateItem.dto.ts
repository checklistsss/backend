import { ApiProperty } from '@nestjs/swagger'
import { ItemStatus } from '../../models/ItemStatus'

export abstract class ApiCreateItem {
  @ApiProperty({
    example: 'Buy spaguetti',
  })
  description: string

  @ApiProperty({
    enum: ItemStatus,
    enumName: 'ItemStatus',
    example: ItemStatus.DONE,
    default: ItemStatus.TO_DO,
    required: false,
  })
  status?: ItemStatus
}
