import {Controller, Post, Body,Get, Param, Patch, Delete} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {


    constructor(private readonly usersService : UsersService){}

    @Post('signUp')
    async addUser(
        @Body('username') username : string, 
        @Body('firstName') firstName : string, 
        @Body('lastName') lastName:string,
        @Body('email') email:string ,
        @Body('password') password : string, 
         )  {
            
        const getResult = await this.usersService.insertUser(username,firstName,lastName,email,password);
        let result;
        if(getResult){
            result = {success:true, username:username}
        }else{
            result = {success:false, username:null}
            console.log("Username has already existed!")
        }
        return result;
    }

    @Get()
    async getAllUsers(){
        const users = await this.usersService.getUsers();
        return users;
    } 

    @Get('signIn')
    async getUser(@Body('email') email: string, @Body('password') password: string){
        const res = await this.usersService.getSingleUser(email,password);
        if(res){
            return {success:true, email:email}
        }else{
            return {success:false, email:null}
        }
        
    }

    @Patch(':username')
    async updateUser(
        @Param('username') username: string ,
        @Body('firstName') firstName: string ,
        @Body('lastName') lastName: string ,
        @Body('email') email: string,
        @Body('password') password: string ,
        ){ 
          
        const res = await this.usersService.updateUser(username,firstName,lastName,email, password);
        if(res){
            console.log("Details updated!")
        }
        return null;
    }

    @Delete(':username')
    async removeUser(@Param('username') username: string){
        const res = await this.usersService.deleteUser(username);
        if(res){
            console.log("User has been deleted!")
        }
        return null;
    }


}