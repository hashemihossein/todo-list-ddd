import { Module } from '@nestjs/common';
import { OrmUserPersistenceModule } from './persistence/orm/orm-persistence.module';

@Module({
  // todo: adding cache persistence adapter in infrastructure layer and port in application layer
  imports: [OrmUserPersistenceModule],
  exports: [OrmUserPersistenceModule],
})
export class UsersInfrastructureModule {}
