import {Controller, Post, Body,Get, Param, Patch, Delete} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {


    constructor(private readonly usersService : UsersService){}

    @Post()
    async addUser(
        @Body('username') username : string, 
        @Body('firstName') firstName : string, 
        @Body('lastName') lastName:string,
        @Body('email') email:string ,
        @Body('password') password : string, 
         )  {
             console.log(firstName);
        const getUName = await this.usersService.insertUser(username,firstName,lastName,email,password);
        return {username : getUName};
    }

    @Get()
    async getAllUsers(){
        const users = await this.usersService.getUsers();
        return users;
    } 

    @Get(':username')
    getUser(@Param('username') username: string){
        return this.usersService.getSingleUser(username);
    }

    @Patch(':username')
    async updateUser(
        @Param('username') username: string ,
        @Body('firstName') firstName: string ,
        @Body('lastName') lastName: string ,
        @Body('email') email: string,
        @Body('password') password: string ,
        ){ 
            console.log(username);
        await this.usersService.updateUser(username,firstName,lastName,email, password);
        return null;
    }

    @Delete(':username')
    async removeUser(@Param('username') username: string){
        await this.usersService.deleteUser(username);
        return null;
    }


}