import {
  Headers,
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Patch,
  UsePipes,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { ListFactory } from '../domain/factories/ListFactory'

import {
  ApiCreateList,
  apiCreateListSchema,
} from '../domain/dtos/api/ApiCreateList.dto'

import { ApiPatchList } from '../domain/dtos/api/ApiPatchList.dto'
import { ApiList } from '../domain/dtos/api/ApiList.dto'
import { ApiListCollection } from '../domain/dtos/api/ApiListCollection.dto'
import { ListApiSerializer } from '../domain/serializers/api/ListApiSerializer'
import { ListCollectionApiSerializer } from '../domain/serializers/api/ListCollectionApiSerializer'
import { ListsRepo } from '../domain/repositories/listsRepo'
import { SchemaValidationPipe } from '../infra/SchemaValidationPipe'

@Controller('lists')
@ApiTags('lists')
@ApiInternalServerErrorResponse({
  description: 'Unexpected error happened',
})
@ApiBadRequestResponse({
  description: 'Operation not successful due to bad input data',
})
export class ListsController {
  constructor(
    private readonly listsRepo: ListsRepo,
    private readonly listApiSerializer: ListApiSerializer,
    private readonly listCollectionApiSerializer: ListCollectionApiSerializer,
    private readonly listFactory: ListFactory,
  ) {}

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
    @Headers('x-user-id') userId: string,
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
  @UsePipes(new SchemaValidationPipe(apiCreateListSchema))
  async createList(
    @Body() createListPayload: ApiCreateList,
    @Headers('x-user-id') userId: string,
  ): Promise<ApiList> {
    const list = this.listFactory.fromCreateListApiModel(
      userId,
      createListPayload,
    )

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
    @Headers('x-user-id') userId: string,
  ): Promise<void> {
    await this.listsRepo.deleteList(userId, listId)
  }

  @Patch(':listId')
  @ApiOperation({
    summary:
      'Allows to patch individual properties of a list. All fields are optional.',
  })
  @ApiOkResponse({
    description: 'List was susccesfuly patched. The updated list is returned.',
    type: ApiList,
  })
  async patchItem(
    @Param('listId') listId: string,
    @Headers('x-user-id') userId: string,
    @Body() patchData: ApiPatchList,
  ): Promise<ApiList> {
    const list = await this.listsRepo.patchList(userId, listId, patchData)

    return this.listApiSerializer.toJSON(list)
  }
}
