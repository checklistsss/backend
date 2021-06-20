import { Module } from '@nestjs/common'
import { ListsController } from './controllers/lists.controller'
import { ItemsController } from './controllers/items.controller'
import { ListsRepo } from './domain/repositories/listsRepo'

@Module({
  imports: [],
  controllers: [ListsController, ItemsController],
  providers: [ListsRepo],
})
export class AppModule {}
