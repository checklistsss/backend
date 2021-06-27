import * as Joi from 'joi'
import { ApiProperty } from '@nestjs/swagger'

export abstract class ApiCreateList {
  @ApiProperty({
    example: 'My Groceries List',
    minLength: 1,
  })
  title: string
}

export const apiCreateListSchema = Joi.object({
  title: Joi.string().uppercase().min(1),
})
