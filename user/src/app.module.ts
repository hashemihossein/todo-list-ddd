import { Module } from '@nestjs/common';
import { UserModule } from './user/application/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
