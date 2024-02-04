import { Injectable } from '@nestjs/common';
import { PrismaClient, ChiTietLoaiCongViec } from '@prisma/client';

@Injectable()
export class JobDetailService {
  prisma = new PrismaClient();

  // LẤT HẾT CÁC CÔNG VIỆC CHI TIẾT
  async getAllJobDetail(): Promise<ChiTietLoaiCongViec[]> {
    const allJobDetail = await this.prisma.chiTietLoaiCongViec.findMany();
    return allJobDetail;
  }

  // THÊM CÔNG VIỆC CHI TIẾT
  async addJobDetail(newJobDetail): Promise<ChiTietLoaiCongViec> {
    const newJobDetailAdded = await this.prisma.chiTietLoaiCongViec.create({
      data: {
        ten_chi_tiet: newJobDetail.tenChiTiet,
        ma_loai_cong_viec: newJobDetail.maLoaiCongViec,
        hinh_anh: newJobDetail.hinhAnh,
      },
    });

    return newJobDetailAdded;
  }
}
