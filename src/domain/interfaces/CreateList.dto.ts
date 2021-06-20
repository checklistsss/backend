import { IsString, IsDefined, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class CreateListPayload {
  @ApiProperty({
    example: 'My Groceries List',
  })
  @IsDefined({
    message: 'title is required'
  })
  @IsNotEmpty()
  @IsString()
  title: string
}
