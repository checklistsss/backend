import { ApiProperty } from '@nestjs/swagger'
import { ItemStatus } from '../models/ItemStatus'

export class CreateItemPayload {
  @ApiProperty({
    example: 'Buy spaguetti',
  })
  description: string

  @ApiProperty({
    enum: ItemStatus,
    example: ItemStatus.DONE,
  })
  status: ItemStatus
}
