import { ApiResponseProperty } from '@nestjs/swagger'
import { ApiItem } from './ApiItem.dto'
import { ApiItemCollection } from './ApiItemCollection.dto'

export abstract class ApiList {
  @ApiResponseProperty({
    example: '5e0a3c93-693f-4803-accc-6e339cf02381',
  })
  id: string

  @ApiResponseProperty({
    example: '9398438e-4fa9-4b24-980e-a73a4cd40daf',
  })
  userId: string

  @ApiResponseProperty({
    example: 'My Groceries List',
  })
  title: string

  @ApiResponseProperty({
    type: [ApiItem],
  })
  items: ApiItemCollection

  @ApiResponseProperty()
  percentageDone: number
}
