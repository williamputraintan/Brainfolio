import mongoose from 'mongoose';
export interface Project {
    id?: string;
    title: string;
    description: string;
    projectFile: string;
    contributor: string;
    like: number;
    comment: string;
    share: string;
}