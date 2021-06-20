import { ApiResponseProperty } from '@nestjs/swagger'
import { PublicItemData } from './Item.dto'

export class PublicListData {
  @ApiResponseProperty({
    example: '5e0a3c93-693f-4803-accc-6e339cf02381',
  })
  id: string

  @ApiResponseProperty({
    example: 'My Groceries List',
  })
  title: string

  @ApiResponseProperty({
    type: [PublicItemData],
  })
  items: PublicItemData[]
}
