import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {User} from './user.model';


@Injectable()
export class UsersService{
    constructor(@InjectModel('User') private readonly userModel: Model<User>,){}

    async insertUser(username: string, firstName: string, lastName: string, email: string, password:string){
        const newUser = new this.userModel({username,firstName,lastName,email,password});
        const result = await newUser.save();
        return result.username;
    }  

    async getUsers(){
        const users = await this.userModel.find();
        console.log(users);
        return users;
    }

    async getSingleUser(username: string){
        const user =  await this.findUser(username);
        // return {

        //     firstName: user.firstName,
        //     lastName :  user.lastName,
        //     email: user.email,
           
        // };
        return user;

    }

    async updateUser(username:string, firstName:string, lastName: string , email: string, password: string){
        const updatedUser = await this.findUser(username);
    
        if(email){
            updatedUser.email=email;
        }
        if(lastName){
            updatedUser.lastName=lastName;
        }
        updatedUser.save();

    }

    async deleteUser(username:string){
        const result  = await this.userModel.deleteOne({username:username});
        if (result.n===0){
            throw new NotFoundException ('Could not find user.');
        }
    }
    private async findUser(username: string){
        let user;
        try
        {
            user = await this.userModel.findOne({username: username});
        }catch(error){
            throw new NotFoundException('Could not find user.');
        }
        if(!user){
            throw new NotFoundException('Could not find user.');
        }
        return user;
    }

    


}