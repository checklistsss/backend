import { Response } from 'express'
import { Body, Controller, Delete, Param, Post, Res, Headers } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { CreateItem } from 'src/domain/interfaces/CreateItem.dto'
import Item from 'src/domain/models/Item'
import { ListsRepo } from '../domain/repositories/listsRepo'
import { HeadersMiddleware } from 'src/utils/headersMiddleware'
import { ListApiSerializer } from 'src/domain/serializers/api/ListApiSerializer'
import { ListApiModel } from 'src/domain/interfaces/ListApiModel.dto'
import { ItemFactory } from 'src/domain/factories/ItemFactory'

@HeadersMiddleware()
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
    type: ListApiModel,
    headers: {
      'x-item-id': {
        description: 'Id of the newly created item',
        example: '4cc61a3d-5a70-4f64-9703-b9648785efee',
      },
    },
  })
  async createItem(
    @Param('listId') listId: string,
    @Body() createItemPayload: CreateItem,
    @Headers('x-user-id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ListApiModel> {
    const item = this.itemFactory.fromCreateListApiModel(createItemPayload)
    const list = await this.listsRepo.insertItem(listId, userId, item)

    res.set('x-item-id', item.id)
    return this.listApiSerializer.toJSON(list)
  }

  @Delete(':itemId')
  @ApiOperation({ summary: 'Removes an item from a list' })
  @ApiOkResponse({
    description: 'Item was susccesfuly removed. The updated list is returned.',
    type: ListApiModel,
  })
  async deleteItem(
    @Param('listId') listId: string,
    @Param('itemId') itemId: string,
    @Headers('x-user-id') userId: string,
  ): Promise<ListApiModel> {
    const list = await this.listsRepo.deleteItem(listId, userId, itemId)
    return this.listApiSerializer.toJSON(list)
  }
}
