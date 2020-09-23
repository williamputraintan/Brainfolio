import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { from } from 'rxjs';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service'
import { Project } from './interfaces/project.interface'

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService){}


    @Get()
    findAll(): Project[] {
        return this.projectsService.findAll();
    }

    @Get(':id')
    findOne(@Param() param): Project{
        return this.projectsService.findOne(param.id);
    }

    @Post()
    create(@Body() createProjectDto: CreateProjectDto): string {
        return `Title: ${createProjectDto.title} \n Desc: ${createProjectDto.description}`;
    }

    @Delete(':id')
    delete(@Param() param): string{
        return `Delete-id: ${param.id}` 
    }

    @Put(':id')
    update(@Body() updateItemDto: CreateProjectDto, @Param() param): string{
        return `Update-id: ${param.id} \n\n title: ${updateItemDto.title}`

    }
}
