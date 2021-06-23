import { ApiResponseProperty } from "@nestjs/swagger"
import { ItemStatus } from "src/domain/models/ItemStatus"

export abstract class ApiItem {
  @ApiResponseProperty({
    example: '3fe9780a-8847-4966-8cac-39cfcbd68e25',
  })
  id: string

  @ApiResponseProperty({
    example: 'Buy spaguetti',
  })
  description: string

  @ApiResponseProperty({
    enum: ItemStatus,
    example: ItemStatus.DONE,
  })
  status: string
}