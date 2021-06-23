import { Headers, Body, Controller, Get, Post, Delete, Param } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { ListFactory } from 'src/domain/factories/ListFactory'
import { ApiCreateList } from 'src/domain/dtos/api/ApiCreateList.dto'
import { ApiList } from 'src/domain/dtos/api/ApiList.dto'
import { ApiListCollection } from 'src/domain/dtos/api/ApiListCollection.dto'
import { ListApiSerializer } from 'src/domain/serializers/api/ListApiSerializer'
import { ListCollectionApiSerializer } from 'src/domain/serializers/api/ListCollectionApiSerializer'
import { ListsRepo } from '../domain/repositories/listsRepo'
import { HeadersMiddleware } from '../utils/headersMiddleware'

@HeadersMiddleware()
@Controller('lists')
@ApiTags('lists')
export class ListsController {
  constructor(
    private readonly listsRepo: ListsRepo,
    private readonly listApiSerializer: ListApiSerializer,
    private readonly listCollectionApiSerializer: ListCollectionApiSerializer,
    private readonly listFactory: ListFactory,
  ) { }

  @Get()
  @ApiOperation({
    summary:
      'Returns all lists that the user has access, optionally filtered by some criteria',
  })
  @ApiOkResponse({
    description: 'Array of the `List` resource',
    isArray: true,
    type: ApiList,
  })
  async findLists(
    @Headers('x-user-id') userId: string
  ): Promise<ApiListCollection> {
    const lists = await this.listsRepo.findLists(userId)
    return this.listCollectionApiSerializer.toJSON(lists)
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new list' })
  @ApiCreatedResponse({
    description: 'List was succesfuly created',
    type: ApiList,
  })
  async createList(
    @Body() createListPayload: ApiCreateList,
    @Headers('x-user-id') userId: string
  ): Promise<ApiList> {
    const list = this.listFactory.fromCreateListApiModel(userId, createListPayload)
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
