import { Env } from '@humanwhocodes/env'
import { Injectable } from '@nestjs/common'

const env = new Env()

export type DynamoDBConfig = {
  tableName: string
  region: string
}

export type AwsConfig = {
  dynamoDb: DynamoDBConfig
}

export type Config = {
  aws: AwsConfig
}

@Injectable()
export default class ConfigProvider {
  private readonly _config: Config

  constructor() {
    env.require('AWS_ACCESS_KEY_ID')
    env.require('AWS_SECRET_ACCESS_KEY')

    this._config = {
      aws: {
        dynamoDb: {
          tableName: env.require('AWS_DYNAMODB_TABLE'),
          region: env.require('AWS_DYNAMODB_REGION'),
        },
      },
    }
  }

  get config(): Config {
    return this._config
  }
}
