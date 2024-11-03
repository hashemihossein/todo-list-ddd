import { Module } from '@nestjs/common';
import { ESDBModule } from './esdb/esdb.module';
import { OrmPersistenceModule } from './orm/orm-persistence.module';

@Module({
  imports: [ESDBModule, OrmPersistenceModule],
  exports: [ESDBModule, OrmPersistenceModule],
})
export class PersistenceModule {}
