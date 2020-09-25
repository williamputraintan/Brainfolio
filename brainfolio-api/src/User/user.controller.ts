import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { SignInDto } from './dto/sign-in-dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}
    
  @Post("/profile")
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto){
    console.log(createUserDto)
    // return this.userService.createUser(createUserDto);
  }

}
