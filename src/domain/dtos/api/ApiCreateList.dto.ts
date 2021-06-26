import { IsString, IsDefined, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export abstract class ApiCreateList {
  @ApiProperty({
    example: 'My Groceries List',
  })
  @IsDefined({
    message: 'title is required',
  })
  @IsNotEmpty()
  @IsString()
  title: string
}
