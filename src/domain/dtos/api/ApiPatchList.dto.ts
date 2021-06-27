import { ApiProperty } from '@nestjs/swagger'

export abstract class ApiPatchList {
  @ApiProperty({
    example: 'Italian dinner checklist',
    required: false,
  })
  title?: string
}
