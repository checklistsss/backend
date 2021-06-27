import { join } from 'path'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import * as request from 'supertest'
import { DynamodbDriverProvider } from '../src/domain/repositories/listsRepo'
import { DynamoDB, Endpoint } from 'aws-sdk'
import ConfigProvider, { Config } from '../src/infra/env'
import { ConfigModule } from '@nestjs/config'
import { AppModule } from '../src/app.module'

@Injectable()
export class LocalDynamodbDriverProvider
  implements DynamodbDriverProvider, OnModuleInit
{
  private readonly _documentClient: DynamoDB.DocumentClient
  private readonly _dynamodbClient: DynamoDB
  private readonly _config: Config

  constructor(configProvider: ConfigProvider) {
    this._config = configProvider.config
    const {
      aws: { dynamoDb },
    } = this._config

    const params = {
      apiVersion: '2012-08-10',
      region: dynamoDb.region,
      endpoint: new Endpoint('http://localhost:8000'),
      params: {
        TableName: dynamoDb.tableName,
      },
    }

    this._documentClient = new DynamoDB.DocumentClient(params)
    this._dynamodbClient = new DynamoDB(params)
  }

  private async deleteTable(): Promise<void> {
    await this._dynamodbClient
      .deleteTable({
        TableName: this._config.aws.dynamoDb.tableName,
      })
      .promise()
      .catch(() => {
        /* intentionally ignored */
      })
  }

  private async createTable(): Promise<void> {
    await this._dynamodbClient
      .createTable({
        TableName: this._config.aws.dynamoDb.tableName,
        AttributeDefinitions: [
          {
            AttributeName: 'userId',
            AttributeType: 'S',
          },
          {
            AttributeName: 'listId',
            AttributeType: 'S',
          },
        ],
        KeySchema: [
          {
            AttributeName: 'userId',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'listId',
            KeyType: 'RANGE',
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      })
      .promise()
  }

  async onModuleInit(): Promise<void> {
    await this.deleteTable()
    await this.createTable()
  }

  get driver(): DynamoDB.DocumentClient {
    return this._documentClient
  }
}

describe('List API', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: join(__dirname, '.test.env'),
        }),
        AppModule,
      ],
    })
      .overrideProvider(DynamodbDriverProvider)
      .useClass(LocalDynamodbDriverProvider)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  describe('POST /lists', () => {
    it('should create a list', () => {
      return request(app.getHttpServer())
        .post('/lists')
        .set('x-user-id', '123')
        .send({ title: 'My List' })
        .expect(201)
    })

    it('should require at least a title to create a list', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/lists')
        .set('x-user-id', '123')
        .send({})
        .expect(400)

      expect(body.message).toEqual([
        {
          message: '"title" is required',
          path: ['title'],
        },
      ])
    })
  })
})
