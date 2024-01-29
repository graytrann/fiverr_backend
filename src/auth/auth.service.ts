import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
  prisma = new PrismaClient();

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
}
