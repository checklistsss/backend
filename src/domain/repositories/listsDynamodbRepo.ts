import { DynamoDB } from 'aws-sdk'
import { Injectable } from '@nestjs/common'
import Item from '../models/Item'
import List from '../models/List'
import ListCollection from '../models/ListCollection'
import { PublicListData } from '../interfaces/List.dto'

export abstract class DynamodbDriverProvider {
  driver: DynamoDB.DocumentClient
}

@Injectable()
export class RealDynamodbDriverProvider implements DynamodbDriverProvider {
  private readonly _driver: DynamoDB.DocumentClient

  constructor() {
    this._driver = new DynamoDB.DocumentClient({
      apiVersion: "2012-08-10",
      region: "eu-central-1",
      accessKeyId: "123",
      secretAccessKey: "123",
      params: {
        TableName: "checklists",
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

  constructor(driverProvider: DynamodbDriverProvider) {
    this._driver = driverProvider.driver
  }

  async insertItem(listId: string, item: Item): Promise<List> {
    return new List("id", "ok")
  }

  async deleteItem(listId: string, itemId: string): Promise<List> {
    return new List("id", "ok")
  }

  async findListById(listId: string): Promise<List> {
    return new List("id", "ok")
  }

  async insertList(list: List): Promise<List> {
    await this._driver.put({
      TableName: "checklists",
      Item: list.toJSON(),
    }).promise()

    return list
  }

  async findLists(userId: string): Promise<ListCollection> {
    const { Items: items } = await this._driver.query({
      TableName: "checklists",
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: { '#userId': 'userId' },
      ExpressionAttributeValues: { ':userId': userId },
    }).promise()

    if (!items) {
      throw new Error('Query returned no items')
    }

    return ListCollection.fromJSON(items as PublicListData[])
  }
}