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
import { ApiQuery } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  

  @ApiQuery({
    name: 'uname',
  })
  @Get('/sign-up')
  signUp(@Body() body: any) {
    return this.authService.signUp(body);
  }
}
