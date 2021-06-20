import { Body, Controller, Get, Post } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CreateListPayload } from 'src/domain/interfaces/CreateList.dto'
import { PublicListData } from 'src/domain/interfaces/List.dto'
import List from 'src/domain/models/List'
import { ListsRepo } from '../domain/repositories/listsRepo'

@Controller('lists')
@ApiTags('lists')
export class ListsController {
  constructor(private readonly listsRepo: ListsRepo) {}

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
  async findLists(): Promise<PublicListData[]> {
    const lists = await this.listsRepo.findLists()
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
  ): Promise<PublicListData> {
    const list = List.fromCreateListPayload(createListPayload)
    await this.listsRepo.insertList(list)

    return list.toJSON()
  }
}
