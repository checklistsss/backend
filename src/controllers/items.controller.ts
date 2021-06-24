import { Response } from 'express'
import { Body, Controller, Delete, Param, Post, Res, Headers } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { ApiCreateItem } from 'src/domain/dtos/api/ApiCreateItem.dto'
import { ListsRepo } from '../domain/repositories/listsRepo'
import { HeadersMiddleware } from 'src/utils/headersMiddleware'
import { ListApiSerializer } from 'src/domain/serializers/api/ListApiSerializer'
import { ApiList } from 'src/domain/dtos/api/ApiList.dto'
import { ItemFactory } from 'src/domain/factories/ItemFactory'

@Controller('lists/:listId/items')
@ApiTags('items')
export class ItemsController {
  constructor(
    private readonly listsRepo: ListsRepo,
    private readonly listApiSerializer: ListApiSerializer,
    private readonly itemFactory: ItemFactory,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Adds a new item to a list' })
  @ApiCreatedResponse({
    description: 'Item was succesfuly created. The updated list is returned.',
    type: ApiList,
    headers: {
      'x-item-id': {
        description: 'Id of the newly created item',
        example: '4cc61a3d-5a70-4f64-9703-b9648785efee',
      },
    },
  })
  async createItem(
    @Param('listId') listId: string,
    @Body() createItemPayload: ApiCreateItem,
    @Headers('x-user-id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiList> {
    const item = this.itemFactory.fromCreateListApiModel(createItemPayload)
    const list = await this.listsRepo.insertItem(listId, userId, item)

    res.set('x-item-id', item.id)
    return this.listApiSerializer.toJSON(list)
  }

  @Delete(':itemId')
  @ApiOperation({ summary: 'Removes an item from a list' })
  @ApiOkResponse({
    description: 'Item was susccesfuly removed. The updated list is returned.',
    type: ApiList,
  })
  async deleteItem(
    @Param('listId') listId: string,
    @Param('itemId') itemId: string,
    @Headers('x-user-id') userId: string,
  ): Promise<ApiList> {
    const list = await this.listsRepo.deleteItem(listId, userId, itemId)
    return this.listApiSerializer.toJSON(list)
  }
}
