import { DynamoDB } from 'aws-sdk'
import { Injectable } from '@nestjs/common'
import Item from '../models/Item'
import List from '../models/List'
import ListCollection from '../models/ListCollection'
import { ListDbSerializer } from '../serializers/db/ListDbSerializer'
import { ItemDbSerializer } from '../serializers/db/ItemDbSerializer'
import { ListFactory } from '../factories/ListFactory'
import { ListCollectionFactory } from '../factories/ListCollectionFactory'
import { DbListCollection } from '../dtos/db/DbListCollection.dto'
import { DbList } from '../dtos/db/DbList.dto'
import ConfigProvider from 'src/infra/env'
import DbItemPatchData from '../dtos/db/DbItemPatch.dto'
import DbListPatchData from '../dtos/db/DbListPatchData.dto'

type KeyMap = DynamoDB.DocumentClient.ExpressionAttributeNameMap
type ValueMap = DynamoDB.DocumentClient.ExpressionAttributeValueMap

export abstract class DynamodbDriverProvider {
  driver: DynamoDB.DocumentClient
}

@Injectable()
export class RealDynamodbDriverProvider implements DynamodbDriverProvider {
  private readonly _driver: DynamoDB.DocumentClient

  constructor(
    configProvider: ConfigProvider,
  ) {
    const { aws: { dynamoDb } } = configProvider.config
    this._driver = new DynamoDB.DocumentClient({
      apiVersion: "2012-08-10",
      region: dynamoDb.region,
      params: {
        TableName: dynamoDb.tableName,
      }
    })
  }

  get driver(): DynamoDB.DocumentClient {
    return this._driver
  }
}

@Injectable()
export class ListsRepo {
  private readonly _driver: DynamoDB.DocumentClient
  private readonly _tableName: string

  constructor(
    driverProvider: DynamodbDriverProvider,
    configProvider: ConfigProvider,
    private readonly listFactory: ListFactory,
    private readonly listCollectionFactory: ListCollectionFactory,
    private readonly listDbSerializer: ListDbSerializer,
    private readonly itemDbSerializer: ItemDbSerializer,
  ) {
    this._driver = driverProvider.driver
    this._tableName = configProvider.config.aws.dynamoDb.tableName
  }

  async patchList(
    userId: string, 
    listId: string,
    listPatchData: DbListPatchData,
  ): Promise<List> {
    const values: ValueMap = {}
    const keys: KeyMap = {}
  
    const expressions = [] 
    for(const [key, value] of Object.entries(listPatchData)) {
      expressions.push(`#${key} = :${key}`)
      keys[`#${key}`] = key
      values[`:${key}`] = value
    }

    const { Attributes: data } = await this._driver.update({
      Key: { userId, listId },
      UpdateExpression: `SET ${expressions.join(', ')}`,
      ExpressionAttributeNames: keys,
      ExpressionAttributeValues: values,
      ReturnValues: 'ALL_NEW',
      TableName: this._tableName,
    }).promise()

    return this.listFactory.fromDbModel(data as DbList)
  }

  async patchItem(
    userId: string, 
    listId: string,
    itemId: string,
    itemPatchData: DbItemPatchData
  ): Promise<List> {
    const values: ValueMap = {}
    const keys: KeyMap = {
      '#itemId': itemId,
      '#items': 'items',
    }
  
    const expressions = [] 
    for(const [key, value] of Object.entries(itemPatchData)) {
      expressions.push(`#items.#itemId.#${key} = :${key}`)
      keys[`#${key}`] = key
      values[`:${key}`] = value
    }

    const { Attributes: data } = await this._driver.update({
      Key: { userId, listId },
      UpdateExpression: `SET ${expressions.join(', ')}`,
      ExpressionAttributeNames: keys,
      ExpressionAttributeValues: values,
      ConditionExpression: `attribute_exists(#items.#itemId)`,
      ReturnValues: 'ALL_NEW',
      TableName: this._tableName,
    }).promise()

    return this.listFactory.fromDbModel(data as DbList)
  }

  async insertItem(listId: string, userId: string, item: Item): Promise<List> {
    const { Attributes: data } = await this._driver.update({
      Key: { userId, listId },
      UpdateExpression: `
        SET 
          #items.#itemId = :item
      `,
      ExpressionAttributeNames: {
        '#itemId': item.id,
        '#items': 'items',
      },
      ExpressionAttributeValues: {
        ':item': this.itemDbSerializer.toJSON(item),
      },
      ConditionExpression: `attribute_not_exists(#items.#itemId)`,
      ReturnValues: 'ALL_NEW',
      TableName: this._tableName,
    }).promise()

    return this.listFactory.fromDbModel(data as DbList)
  }

  async deleteItem(listId: string, userId: string, itemId: string): Promise<List> {
    const { Attributes: data } = await this._driver.update({
      Key: { userId, listId },
      UpdateExpression: `
        REMOVE 
          #items.#itemId
      `,
      ExpressionAttributeNames: {
        '#itemId': itemId,
        '#items': 'items',
      },
      ConditionExpression: `
        attribute_exists(#items.#itemId)
      `,
      ReturnValues: 'ALL_NEW',
      TableName: this._tableName,
    }).promise()

    return this.listFactory.fromDbModel(data as DbList)    
  }

  async insertList(list: List): Promise<List> {
    await this._driver.put({
      TableName: this._tableName,
      Item: this.listDbSerializer.toJSON(list),
    }).promise()

    return list
  }

  async findLists(userId: string): Promise<ListCollection> {
    const { Items: items } = await this._driver.query({
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: { '#userId': 'userId' },
      ExpressionAttributeValues: { ':userId': userId },
      TableName: this._tableName,
    }).promise()

    if (!items) {
      throw new Error('Query returned no items')
    }

    return this.listCollectionFactory.fromDbCollection(items as DbListCollection)
  }

  async deleteList(userId: string, listId: string): Promise<void> {
    await this._driver.delete({
      TableName: this._tableName,
      Key: { userId, listId },
    }).promise()
  }
}
