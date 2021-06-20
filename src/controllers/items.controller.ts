import { Response } from 'express'
import { Body, Controller, Delete, Param, Post, Res } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { CreateItemPayload } from 'src/domain/interfaces/CreateItem.dto'
import { PublicListData } from 'src/domain/interfaces/List.dto'
import Item from 'src/domain/models/Item'
import { ListsRepo } from '../domain/repositories/listsRepo'

@Controller('lists/:listId/items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly listsRepo: ListsRepo) {}

  @Post()
  @ApiOperation({ summary: 'Adds a new item to a list' })
  @ApiCreatedResponse({
    description: 'Item was succesfuly created. The updated list is returned.',
    type: PublicListData,
    headers: {
      'x-item-id': {
        description: 'Id of the newly created item',
        example: '4cc61a3d-5a70-4f64-9703-b9648785efee',
      },
    },
  })
  async createItem(
    @Param('listId') listId: string,
    @Body() createItemPayload: CreateItemPayload,
    @Res({ passthrough: true }) res: Response,
  ): Promise<PublicListData> {
    const item = Item.fromCreateItemPayload(createItemPayload)
    const list = await this.listsRepo.insertItem(listId, item)

    res.set('x-item-id', item.id)
    return list.toJSON()
  }

  @Delete(':itemId')
  @ApiOperation({ summary: 'Removes an item from a list' })
  @ApiOkResponse({
    description: 'Item was susccesfuly removed. The updated list is returned.',
    type: PublicListData,
  })
  async deleteItem(
    @Param('listId') listId: string,
    @Param('itemId') itemId: string,
  ): Promise<PublicListData> {
    const list = await this.listsRepo.deleteItem(listId, itemId)
    return list.toJSON()
  }
}
