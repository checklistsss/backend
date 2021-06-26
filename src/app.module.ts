import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ListsController } from './controllers/lists.controller'
import { ItemsController } from './controllers/items.controller'
import {
  ListsRepo,
  RealDynamodbDriverProvider,
  DynamodbDriverProvider,
} from './domain/repositories/listsRepo'
import { ListFactory } from './domain/factories/ListFactory'
import { ItemCollectionFactory } from './domain/factories/ItemCollectionFactory'
import { ItemFactory } from './domain/factories/ItemFactory'
import { ListDbSerializer } from './domain/serializers/db/ListDbSerializer'
import { ItemCollectionDbSerializer } from './domain/serializers/db/ItemCollectionDbSerializer'
import { ItemDbSerializer } from './domain/serializers/db/ItemDbSerializer'
import { ListApiSerializer } from './domain/serializers/api/ListApiSerializer'
import { ItemCollectionApiSerializer } from './domain/serializers/api/ItemCollectionApiSerializer'
import { ItemApiSerializer } from './domain/serializers/api/ItemApiSerializer'
import { ListCollectionApiSerializer } from './domain/serializers/api/ListCollectionApiSerializer'
import { ListCollectionFactory } from './domain/factories/ListCollectionFactory'
import ConfigProvider from './infra/env'

const dynamodbProvider = {
  provide: DynamodbDriverProvider,
  useClass: RealDynamodbDriverProvider,
}

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ListsController, ItemsController],
  providers: [
    // Infra
    dynamodbProvider,
    ConfigProvider,

    // Repos
    ListsRepo,

    // Factories
    ItemFactory,
    ItemCollectionFactory,
    ListFactory,
    ListCollectionFactory,

    // Serializers
    ListDbSerializer,
    ItemCollectionDbSerializer,
    ItemDbSerializer,

    ListCollectionApiSerializer,
    ListApiSerializer,
    ItemCollectionApiSerializer,
    ItemApiSerializer,
  ],
})
export class AppModule {}
