import { Injectable } from '@nestjs/common';
import { LoaiCongViec, PrismaClient } from '@prisma/client';

@Injectable()
export class JobTypeService {
  prisma = new PrismaClient();

  // THÊM LOẠI CÔNG VIỆC
  async addJobType(body: { ten_loai_cong_viec: string }): Promise<string> {
    const newJobType = await this.prisma.loaiCongViec.create({
      data: {
        ten_loai_cong_viec: body.ten_loai_cong_viec,
      },
    });
    return `Đã thêm mới loại công việc :${body.ten_loai_cong_viec}`;
  }

  // LẤY HẾT JOB
  async getAllJobType(): Promise<LoaiCongViec[]> {
    const allJob = await this.prisma.loaiCongViec.findMany();
    // Trả về mảng đối tượng công việc
    return allJob;
  }

  // LẤY JOB CHI TIẾT
  async getJobTypeById(jobTypeId: number): Promise<LoaiCongViec | null> {
    const jobType = await this.prisma.loaiCongViec.findUnique({
      where: {
        id: jobTypeId,
      },
    });
    return jobType;
  }

  // LẤY JOB CHI TIẾT
  async updateJobType(
    jobTypeId: number,
    updatedData: Partial<LoaiCongViec>,
  ): Promise<LoaiCongViec | null> {
    const updatedJobType = await this.prisma.loaiCongViec.update({
      where: { id: jobTypeId },
      data: updatedData,
    });
    return updatedJobType;
  }
}
