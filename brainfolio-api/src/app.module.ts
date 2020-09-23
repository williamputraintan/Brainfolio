import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';

require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` });

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_URL}`,{ useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "UserDb"
}),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
