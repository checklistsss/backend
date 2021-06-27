import { ApiProperty } from '@nestjs/swagger'
import { ItemStatus } from '../../models/ItemStatus'

export abstract class ApiPatchItem {
  @ApiProperty({
    example: 'Buy tortellini',
    required: false,
  })
  description?: string

  @ApiProperty({
    enum: ItemStatus,
    enumName: 'ItemStatus',
    example: ItemStatus.IN_PROGRESS,
    required: false,
  })
  status: string
}
