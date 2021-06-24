import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export abstract class ApiPatchList {
  @ApiProperty({
    example: 'Italian dinner checklist',
    required: false,
  })
  @IsOptional()
  title?: string
}
