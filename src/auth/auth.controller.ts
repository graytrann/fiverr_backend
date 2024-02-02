import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

class newUser {
  @ApiProperty()
  uname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  pass_word: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  birth_day: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  skill: string;

  @ApiProperty()
  certification: string;
}

class existUser {
  @ApiProperty()
  email: string;

  @ApiProperty()
  pass_word: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @ApiBody({
    type: newUser,
  })
  @Post('/sign-up')
  signUp(@Body() body: any) {
    return this.authService.signUp(body);
  }

  @ApiBody({
    type: existUser,
  })
  @Post('/sign-in')
  signIn(@Body() body: any) {
    return this.authService.signIn(body);
  }
}
