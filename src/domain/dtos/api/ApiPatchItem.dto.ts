import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { ItemStatus } from 'src/domain/models/ItemStatus'

export abstract class ApiPatchItem {
  @ApiProperty({
    example: 'Buy tortellini',
    required: false,
  })
  @IsOptional()
  description?: string

  @ApiProperty({
    enum: ItemStatus,
    enumName: 'ItemStatus',
    example: ItemStatus.IN_PROGRESS,
    required: false,
  })
  @IsOptional()
  status: string
}
