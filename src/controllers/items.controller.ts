import { Response } from 'express'
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Res,
  Headers,
  Patch,
} from '@nestjs/common'

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { ApiCreateItem } from '../domain/dtos/api/ApiCreateItem.dto'
import { ListsRepo } from '../domain/repositories/listsRepo'
import { ListApiSerializer } from '../domain/serializers/api/ListApiSerializer'
import { ApiList } from '../domain/dtos/api/ApiList.dto'
import { ItemFactory } from '../domain/factories/ItemFactory'
import { ApiPatchItem } from '../domain/dtos/api/ApiPatchItem.dto'

@Controller('lists/:listId/items')
@ApiTags('items')
@ApiInternalServerErrorResponse({
  description: 'Unexpected error happened',
})
@ApiBadRequestResponse({
  description: 'Operation not successful due to bad input data',
})
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
    const list = await this.listsRepo.insertItem({ listId, userId }, item)

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
    const list = await this.listsRepo.deleteItem({ listId, userId }, itemId)
    return this.listApiSerializer.toJSON(list)
  }

  @Patch(':itemId')
  @ApiOperation({
    summary:
      'Allows to patch individual properties of an item. Use this operation to mark an items as `done`. All fields are optional.',
  })
  @ApiOkResponse({
    description: 'Item was susccesfuly patched. The updated list is returned.',
    type: ApiList,
  })
  async patchItem(
    @Param('listId') listId: string,
    @Param('itemId') itemId: string,
    @Headers('x-user-id') userId: string,
    @Body() patchData: ApiPatchItem,
  ): Promise<ApiList> {
    const list = await this.listsRepo.patchItem(
      { userId, listId },
      itemId,
      patchData,
    )

    return this.listApiSerializer.toJSON(list)
  }
}
