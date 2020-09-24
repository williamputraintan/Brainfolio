import { Model } from 'mongoose';
import { Injectable , NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import {User} from './user.model';
import { User } from '../schemas/user.schema';


@Injectable()
export class UsersService{
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}

    async insertUser(username: string, firstName: string, lastName: string, email: string, password:string){
        let result;
        if(await this.userModel.findOne({username: username})){
            result = false;
        }else{
            const newUser = new this.userModel({username,firstName,lastName,email,password});
            newUser.save;
            result = true;
        }
        return result.username;
    }  

    async getUsers(){
        const users = await this.userModel.find();
        console.log(users);
        return users;
    }
   
    async getSingleUser(email: string, password:string){
        const user =  await this.userModel.findOne({email: email, password:password});
        console.log(password)
        if(!user){
         
            return null;
        }else{
            return user;
        }

    }

    async updateUser(username:string, firstName:string, lastName: string , email: string, password: string){
        const updatedUser = await this.userModel.findOne({username:username});
    
        if(email){
            updatedUser.email=email;
        }
        if(firstName){
            updatedUser.firstName=firstName;
        }
        if(lastName){
            updatedUser.lastName=lastName;
        }
        updatedUser.save();
        return true;
    }

    async deleteUser(username:string){
        const result  = await this.userModel.deleteOne({username:username});
        if (result.n===0){
            throw new NotFoundException ('Could not find user.');
        } else{
            return true;
        }
      }
    


}