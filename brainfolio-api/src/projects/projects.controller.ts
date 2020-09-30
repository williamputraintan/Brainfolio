import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service'
import { Project } from './schemas/project.schema'

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
    create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectsService.create(createProjectDto);
    }

    @Delete(':id')
    delete(@Param() param): Promise<Project> {
        return this.projectsService.delete(param.id);
    }

    @Put(':id')
    update(@Body() updateItemDto: CreateProjectDto, @Param() param): Promise<Project> {
        return this.projectsService.update(param.id,updateItemDto);

    }
}
