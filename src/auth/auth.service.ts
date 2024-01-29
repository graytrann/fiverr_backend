import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  // ĐĂNG KÝ
  async signUp(body: {
    uname: string;
    email: string;
    pass_word: string;
    phone: string;
    birthday: string;
    gender: string;
    role: string;
    skill: string;
    certification: string;
  }): Promise<string> {
    // Kiểm tra xem người dùng có tồn tại không
    const existingUser = await this.prisma.nguoiDung.findFirst({
      where: {
        email: body.email,
      } as { email: string },
    });

    if (existingUser) {
      // Người dùng đã tồn tại
      return 'Người dùng đã tồn tại';
    }

    // Nếu người dùng không tồn tại, tạo mới người dùng
    const newUser = await this.prisma.nguoiDung.create({
      data: {
        uname: body.uname,
        email: body.email,
        pass_word: body.pass_word,
        phone: body.phone,
        birth_day: body.birthday,
        gender: body.gender,
        role: body.role,
        skill: body.skill,
        certification: body.certification,
      },
    });

    // Trả về thông tin của người dùng mới tạo
    return 'Người dùng đã được tạo mới';
  }

  // ĐĂNG NHẬP
  async signIn(body: { email: string; pass_word: string }): Promise<string> {
    const user = await this.prisma.nguoiDung.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      // Người dùng không tồn tại
      return 'Người dùng không tồn tại';
    }

    if (user.pass_word !== body.pass_word) {
      // Mật khẩu không khớp
      return 'Mật khẩu không đúng';
    }

    // Đăng nhập thành công
    return 'Đăng nhập thành công';
  }
}
