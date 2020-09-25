import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { SignInDto } from 'src/user/dto/sign-in-dto';
import { User } from 'src/user/user.schema';
import { IAccessToken } from './jwt/access-token.interface';
import { JwtPayload } from './jwt/jwt-payload.interface';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService
  ){}

  //Helper Methods
  private async hashPassword(password: string, salt:string): Promise<string>{
    return await bcrypt.hash(password, salt);
  }

  private async validatePassword(password: string, user:User): Promise<boolean>{
    const hash = await this.hashPassword(password,user.salt);
    return hash === user.password; 
  }


  async signUp(createUserDto: CreateUserDto): Promise<User>{
    const { fullname, email, password } = createUserDto;

    const User = new this.userModel(createUserDto);
    User.fullname = fullname,
    User.email = email,
    User.salt = await bcrypt.genSalt()
    User.password = await this.hashPassword(password, User.salt);
    

    return await User.save().catch(err =>{
      throw new ConflictException({
        ...err,
        reason:`${(err.code === 11000 && "Duplicate") || "Mongo Input Error"}`
      })
    });
    
  }


  async signIn(signInDto: SignInDto) : Promise<IAccessToken>{

    const { email, password } = signInDto;
    const user = await this.userModel.findOne({email})
  
    //await !important
    if(user && await this.validatePassword(password, user)){
      const payload: JwtPayload = { email }
      const accessToken =  this.jwtService.sign(payload);
      return {accessToken}
    }
    else{
      throw new NotFoundException({
        message: "User Not Found"
      })
    }
  }
}
