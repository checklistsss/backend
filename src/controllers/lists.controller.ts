import { Headers, Body, Controller, Get, Post, Delete, Param } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { CreateListPayload } from 'src/domain/interfaces/CreateList.dto'
import { PublicListData } from 'src/domain/interfaces/List.dto'
import { ListApiModel } from 'src/domain/interfaces/ListApiModel.dto'
import { ListCollectionApiModel } from 'src/domain/interfaces/ListCollectionApiModel.dto'
import List from 'src/domain/models/List'
import { ListApiSerializer } from 'src/domain/serializers/api/ListApiSerializer'
import { ListCollectionApiSerializer } from 'src/domain/serializers/api/ListCollectionApiSerializer'
import { ListsRepo } from '../domain/repositories/listsDynamodbRepo'
import { HeadersMiddleware } from '../utils/headersMiddleware'

@HeadersMiddleware()
@Controller('lists')
@ApiTags('lists')
export class ListsController {
  constructor(
    private readonly listsRepo: ListsRepo,
    private readonly listApiSerializer: ListApiSerializer,
    private readonly listCollectionApiSerializer: ListCollectionApiSerializer,
  ) { }

  @Get()
  @ApiOperation({
    summary:
      'Returns all lists that the user has access, optionally filtered by some criteria',
  })
  @ApiOkResponse({
    description: 'Array of the `List` resource',
    isArray: true,
    type: PublicListData,
  })
  async findLists(
    @Headers('x-user-id') userId: string
  ): Promise<ListCollectionApiModel> {
    const lists = await this.listsRepo.findLists(userId)
    return this.listCollectionApiSerializer.toJSON(lists)
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new list' })
  @ApiCreatedResponse({
    description: 'List was succesfuly created',
    type: PublicListData,
  })
  async createList(
    @Body() createListPayload: CreateListPayload,
    @Headers('x-user-id') userId: string
  ): Promise<ListApiModel> {
    const list = List.fromCreateListPayload(userId, createListPayload)
    await this.listsRepo.insertList(list)

    return this.listApiSerializer.toJSON(list)
  }

  @Delete('/:listId')
  @ApiOperation({ summary: 'Deletes a list' })
  @ApiNoContentResponse({
    description: 'List was succesfuly deleted',
  })
  async deleteList(
    @Param('listId') listId: string,
    @Headers('x-user-id') userId: string
  ): Promise<void> {
    await this.listsRepo.deleteList(userId, listId)
  }
}
