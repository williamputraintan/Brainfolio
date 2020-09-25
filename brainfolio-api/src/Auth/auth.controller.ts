import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { SignInDto } from 'src/user/dto/sign-in-dto';
import { AuthService } from './auth.service';
import { IAccessToken } from './jwt/access-token.interface';
import { User } from 'src/user/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User>{
    const User = await this.authService.signUp(createUserDto)
    delete User.password
    delete User.salt
    return User
  }

  
  @Post("/signin")
  @HttpCode(HttpStatus.OK)
  async signIn(@Body(ValidationPipe) signInDto: SignInDto){
    return this.authService.signIn(signInDto)

  }
}
