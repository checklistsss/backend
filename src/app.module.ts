import { Module } from '@nestjs/common'
import { ListsController } from './controllers/lists.controller'
import { ItemsController } from './controllers/items.controller'
import { ListsRepo, RealDynamodbDriverProvider, DynamodbDriverProvider } from './domain/repositories/listsDynamodbRepo'

const dynamodbProvider = {
  provide: DynamodbDriverProvider,
  useClass: RealDynamodbDriverProvider
}

@Module({
  imports: [],
  controllers: [ListsController, ItemsController],
  providers: [ListsRepo, dynamodbProvider],
})
export class AppModule {}
