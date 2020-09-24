import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule} from './projects/projects.module';
import { MongooseModule } from '@nestjs/mongoose';

require('dotenv').config()


@Module({
  imports: [ProjectsModule, MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
