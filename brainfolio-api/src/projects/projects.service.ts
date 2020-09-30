import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema'
import { CreateProjectDto } from './dto/create-project.dto';


@Injectable()
export class ProjectsService {

    constructor(@InjectModel('Project') private readonly projectModel: Model<Project>) {}


    async create(project: CreateProjectDto): Promise<Project> {
        const newProject = new this.projectModel(project);
        return newProject.save();
      }
    
    async findAll(): Promise<Project[]> {
        return this.projectModel.find().exec();
    }


    async findOne(id: string): Promise<Project> {
        return await this.projectModel.findOne({_id: id})
        
    }

    async delete(id: string): Promise<Project> {
        return await this.projectModel.findByIdAndRemove(id)
        
    }

    async update(id: string, project:CreateProjectDto): Promise<Project> {
        return await this.projectModel.findByIdAndUpdate(id, project, {new: true})
        
    }




}
