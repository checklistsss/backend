import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { ItemStatus } from 'src/domain/models/ItemStatus'

export abstract class ApiPatchItem {
  @ApiProperty({
    example: 'Buy tortellini',
  })
  @IsOptional()
  description?: string

  @ApiProperty({
    enum: ItemStatus,
    enumName: 'ItemStatus',
    example: ItemStatus.IN_PROGRESS,
  })
  @IsOptional()
  status: string
}
