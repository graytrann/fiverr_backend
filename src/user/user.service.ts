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

  // lấy hết người dùng
  async getAllUser(): Promise<NguoiDung[]> {
    const allUser = await this.prisma.nguoiDung.findMany();
    return allUser;
  }

  // thêm người dùng
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

  async updateUser(
    id: number,
    body: {
      uname?: string;
      email?: string;
      pass_word?: string;
      phone?: string;
      birth_day?: string;
      gender?: string;
      role?: string;
      skill?: string;
      certification?: string;
    },
  ): Promise<string> {
    const existingUser = await this.prisma.nguoiDung.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingUser) {
      return 'Người dùng không tồn tại';
    }

    const updatedUser = await this.prisma.nguoiDung.update({
      where: {
        id: id,
      },
      data: {
        uname: body.uname || existingUser.uname,
        email: body.email || existingUser.email,
        pass_word: body.pass_word
          ? await bcrypt.hash(body.pass_word, 10)
          : existingUser.pass_word,
        phone: body.phone || existingUser.phone,
        birth_day: body.birth_day || existingUser.birth_day,
        gender: body.gender || existingUser.gender,
        role: body.role || existingUser.role,
        skill: body.skill || existingUser.skill,
        certification: body.certification || existingUser.certification,
      },
    });

    return 'Người dùng đã được cập nhật';
  }

  // lấy người dùng theo ID
  async getUserById(userId: number): Promise<NguoiDung | null> {
    const user = await this.prisma.nguoiDung.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  // Xóa người dùng
  async deleteUser(userId: number): Promise<string> {
    try {
      const existingUser = await this.prisma.nguoiDung.findUnique({
        where: {
          id: userId,
        },
      });

      if (!existingUser) {
        return 'Người dùng không tồn tại';
      }

      await this.prisma.nguoiDung.delete({
        where: {
          id: userId,
        },
      });

      return 'Đã xóa người dùng';
    } catch (error) {
      console.error('Error deleting user:', error);
      return 'Đã xảy ra lỗi khi xóa người dùng';
    }
  }
}
