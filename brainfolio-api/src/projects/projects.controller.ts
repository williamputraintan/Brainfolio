import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe } from '@nestjs/common';
import { ProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service'
import { Project } from './interfaces/project.interface'

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService){}

    @Get()
    findAll(): Promise<Project[]> {
        return this.projectsService.findAll();
    } 

    @Get(':id')
    findOne(@Param() param): Promise<Project> {
        return this.projectsService.findOne(param.id);
    }

    @Post()
    create(@Body(ValidationPipe) createProjectDto: ProjectDto): Promise<Project> {
        return this.projectsService.create(createProjectDto);
    }

    @Delete(':id')
    delete(@Param() param): Promise<Project> {
        return this.projectsService.delete(param.id);
    }

    @Put(':id')
    update(@Body() updateItemDto: ProjectDto, @Param() param): Promise<Project> {
        return this.projectsService.update(param.id,updateItemDto);

    }
}
