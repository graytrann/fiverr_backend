import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaClient, NguoiDung } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();

  async getAllUser(): Promise<NguoiDung[]> {
    const allUser = await this.prisma.nguoiDung.findMany();
    return allUser;
  }

  async addUser(body: {
    uname: string;

    email: string;

    pass_word: string;

    phone: string;

    birth_day: string;

    gender: string;

    role: string;

    skill: string;

    certification: string;
  }): Promise<string> {
    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(body.pass_word, 10);
    const newUser = await this.prisma.nguoiDung.create({
      data: {
        uname: body.uname,

        email: body.email,

        pass_word: hashedPassword,

        phone: body.phone,

        birth_day: body.birth_day,

        gender: body.gender,

        role: body.role,

        skill: body.skill,

        certification: body.certification,
      },
    });
    return `Đã thêm mới người dùng`;
  }

  async getUserById(userId: number): Promise<NguoiDung | null> {
    const user = await this.prisma.nguoiDung.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
  // THÊM LOẠI CÔNG VIỆC
  
  async addJobType(body: { ten_loai_cong_viec: string }): Promise<string> {
    const newJobType = await this.prisma.loaiCongViec.create({
      data: {
        ten_loai_cong_viec: body.ten_loai_cong_viec,
      },
    });
    return `Đã thêm mới loại công việc :${body.ten_loai_cong_viec}`;
  }
}
