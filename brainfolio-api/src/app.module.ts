import { Module } from '@nestjs/common';
import { ProjectsModule} from './projects/projects.module';
import { MongooseModule } from '@nestjs/mongoose';

require('dotenv').config()


@Module({
  imports: [ProjectsModule, MongooseModule.forRoot(process.env.MONGO_URL)],
})
export class AppModule {}
