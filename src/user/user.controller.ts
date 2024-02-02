import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

class user {
  @ApiProperty()
  uname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  pass_word: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  skill: string;

  @ApiProperty()
  certification: string;
}

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  // LẤY HẾT NGƯỜI DÙNG
  @Get('get')
  getAllUser() {
    return this.userService.getAllUser();
  }

  // LẤY NGƯỜI DÙNG THEO ID
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('getById')
  getUserById(@Headers('Authorization') authHeader: string) {
    // Kiểm tra xem header có tồn tại không
    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    // Lấy token từ header
    const token = authHeader.replace('Bearer ', '');

    try {
      // Giải mã token
      const decodedToken = this.jwtService.verify(token, { secret: 'BI_MAT' });

      // Lấy userId từ thông tin giải mã
      const userId = decodedToken.data.userId;

      // Gọi service để lấy thông tin user
      return this.userService.getUserById(userId);
    } catch (error) {
      // Xử lý lỗi khi giải mã không thành công
      throw new UnauthorizedException('Invalid token');
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('ye')
  async yourEndpoint(@Headers('Authorization') customHeader: string) {
    // Your logic here
    await console.log('Custom Header:', customHeader);

    // Return your response
    return { message: 'Received custom header' };
  }
}
