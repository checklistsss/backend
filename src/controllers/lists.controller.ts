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
import List from 'src/domain/models/List'
import { ListsRepo } from '../domain/repositories/listsDynamodbRepo'
import { HeadersMiddleware } from '../utils/headersMiddleware'

@HeadersMiddleware()
@Controller('lists')
@ApiTags('lists')
export class ListsController {
  constructor(private readonly listsRepo: ListsRepo) { }

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
  ): Promise<PublicListData[]> {
    const lists = await this.listsRepo.findLists(userId)
    return lists.toJSON()
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
  ): Promise<PublicListData> {
    const list = List.fromCreateListPayload(userId, createListPayload)
    await this.listsRepo.insertList(list)

    return list.toJSON()
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
