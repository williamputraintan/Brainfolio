import { Injectable } from '@nestjs/common';
import { Project } from './interfaces/project.interface'

@Injectable()
export class ProjectsService {
    private readonly projects:Project[] = [
        {
            id: "14045",
            title: "Machine Learning Algorithm",
            description:  "Machine Learning Algorithm",
            projectFile:  "Machine Learning Algorithm",
            contributor:  "Machine Learning Algorithm",
            like: 10,
            comment:  "Machine Learning Algorithm",
            share:  "Machine Learning Algorithm",
        },
        {
            id: "33333",
            title: "Machine Learning Algorithm 2.0",
            description:  "Machine Learning Algorithm 2.0",
            projectFile:  "Machine Learning Algorithm 2.0",
            contributor:  "Machine Learning Algorithm 2.0",
            like: 100,
            comment:  "Machine Learning Algorithm 2.0",
            share:  "Machine Learning Algorithm 2.0",
        }
    ];

    findAll(): Project[]{
        return this.projects;
    }

    findOne(id: string): Project{
        return this.projects.find(project => project.id === id)
        
    }


}
