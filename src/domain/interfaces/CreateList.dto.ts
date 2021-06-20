import { ApiProperty } from '@nestjs/swagger'

export class CreateListPayload {
  @ApiProperty({
    example: 'My Groceries List',
  })
  title: string
}
