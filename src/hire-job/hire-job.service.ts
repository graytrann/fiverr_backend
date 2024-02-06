import { Injectable } from '@nestjs/common';
import { PrismaClient, ThueCongViec } from '@prisma/client';
@Injectable()
export class HireJobService {
  prisma = new PrismaClient();

  // LẤY HẾT BẢNG THUÊ CÔNG VIỆC
  async getAllHireJob(): Promise<ThueCongViec[]> {
    const allHireJob = await this.prisma.thueCongViec.findMany();
    return allHireJob;
  }

  // LẤY THEO ID
  async getById(JobToHireId: number): Promise<ThueCongViec> {
    const selectedHireJob = await this.prisma.thueCongViec.findFirst({
      where: {
        id: JobToHireId,
      },
    });
    return selectedHireJob;
  }

  // THUÊ CÔNG VIỆC
  async hireJob(hireJobInfo: any): Promise<ThueCongViec> {
    const hoanThanh = hireJobInfo.hoan_thanh === 'true' ? true : false;
    const newHireJobInfo = await this.prisma.thueCongViec.create({
      data: {
        ma_cong_viec: parseInt(hireJobInfo.ma_cong_viec, 10),
        ma_nguoi_thue: parseInt(hireJobInfo.ma_nguoi_thue, 10),
        ngay_thue: hireJobInfo.ngay_thue,
        hoan_thanh: hoanThanh,
      },
    });
    return newHireJobInfo;
  }

  // UPDATE THUÊ CÔNG VIỆC
  async update(id: number, hireJobInfo: any): Promise<ThueCongViec | string> {
    const hoanThanh = hireJobInfo.hoan_thanh === 'true' ? true : false;
    const selectedHireJob = await this.prisma.thueCongViec.findFirst({
      where: {
        id: id,
      },
    });

    if (!selectedHireJob) {
      return 'Không tìm thấy';
    }

    const newHireJob = await this.prisma.thueCongViec.update({
      where: {
        id: id,
      },
      data: {
        ma_cong_viec:
          parseInt(hireJobInfo.ma_cong_viec, 10) ||
          selectedHireJob.ma_cong_viec,
        ma_nguoi_thue:
          parseInt(hireJobInfo.ma_nguoi_thue, 10) ||
          selectedHireJob.ma_nguoi_thue,
        ngay_thue: hireJobInfo.ngay_thue || selectedHireJob.ngay_thue,
        hoan_thanh: hoanThanh || selectedHireJob.hoan_thanh,
      },
    });
    return 'Đã cập nhật';
  }

  // XÓA THUÊ CÔNG VIỆC
  async delete(id: number) {
    const selectedHireJob = await this.prisma.thueCongViec.findFirst({
      where: {
        id: id,
      },
    });

    if (!selectedHireJob) {
      return 'Không tìm thấy';
    }

    await this.prisma.thueCongViec.delete({
      where: {
        id: id,
      },
    });

    return 'Đã xóa thành công';
  }
}
