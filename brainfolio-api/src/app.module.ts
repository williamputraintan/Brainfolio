import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsService } from './projects/projects.service';
import { ProjectsModule} from './projects/projects.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [ProjectsModule, MongooseModule.forRoot('mongodb+srv://hans:hans@cluster0.5nu9i.mongodb.net/ProjectDb?retryWrites=true&w=majority')],
  controllers: [AppController, ProjectsController],
  providers: [AppService, ProjectsService],
})
export class AppModule {}
