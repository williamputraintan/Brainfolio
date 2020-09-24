import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
