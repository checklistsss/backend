import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { ItemStatus } from '../../models/ItemStatus'

export abstract class ApiCreateItem {
  @ApiProperty({
    example: 'Buy spaguetti',
  })
  @IsString()
  description: string

  @ApiProperty({
    enum: ItemStatus,
    enumName: 'ItemStatus',
    example: ItemStatus.DONE,
    default: ItemStatus.TO_DO,
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: ItemStatus
}
