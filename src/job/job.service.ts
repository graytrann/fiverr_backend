import { Injectable } from '@nestjs/common';
import { PrismaClient, CongViec } from '@prisma/client';

@Injectable()
export class JobService {
  prisma = new PrismaClient();
  // LẤY HẾT CÁC CÔNG VIỆC
  async getAllJob(): Promise<CongViec[]> {
    const allJob = await this.prisma.congViec.findMany();
    // Trả về mảng đối tượng công việc
    return allJob;
  }

  // LẤY VIỆC THEO ID
  async getJoblByID(jobId: number): Promise<CongViec | null> {
    const job = await this.prisma.congViec.findUnique({
      where: {
        id: jobId,
      },
    });
    return job;
  }

  // THÊM VIỆC
  async addJob(newJob: any): Promise<CongViec> {
    const newJobAdded = await this.prisma.congViec.create({
      data: {
        ten_cong_viec: newJob.ten_cong_viec,
        danh_gia: newJob.danh_gia,
        gia_tien: newJob.gia_tien,
        hinh_anh: newJob.hinh_anh,
        mo_ta: newJob.mo_ta,
        mo_ta_ngan: newJob.mo_ta_ngan,
        sao_cong_viec: newJob.sao_cong_viec,
        ma_chi_tiet_loai: newJob.ma_chi_tiet_loai,
        nguoi_tao: newJob.nguoi_tao,
      },
    });

    return newJobAdded;
  }

  // UPDATE VIỆC
  async updateJob(id: number, newJob: any): Promise<string> {
    const existingJob = await this.prisma.congViec.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingJob) {
      return 'Người dùng không tồn tại';
    }

    const updatedJob = await this.prisma.congViec.update({
      where: {
        id: id,
      },
      data: {
        ten_cong_viec: newJob.ten_cong_viec || existingJob.ten_cong_viec,
        danh_gia: newJob.danh_gia || existingJob.danh_gia,
        gia_tien: newJob.gia_tien || existingJob.gia_tien,
        hinh_anh: newJob.hinh_anh || existingJob.hinh_anh,
        mo_ta: newJob.mo_ta || existingJob.mo_ta,
        mo_ta_ngan: newJob.mo_ta_ngan || existingJob.mo_ta_ngan,
        sao_cong_viec: newJob.sao_cong_viec || existingJob.sao_cong_viec,
        ma_chi_tiet_loai:
          newJob.ma_chi_tiet_loai || existingJob.ma_chi_tiet_loai,
        nguoi_tao: newJob.nguoi_tao || existingJob.nguoi_tao,
      },
    });

    return 'Đã cập nhật công việc';
  }

  // XÓA JOB
  async deteleJob(jobId: number): Promise<string> {
    try {
      const existingJob = await this.prisma.congViec.findUnique({
        where: {
          id: jobId,
        },
      });

      if (!existingJob) {
        return 'Công việc không tồn tại';
      }

      // Delete the user
      await this.prisma.congViec.delete({
        where: {
          id: jobId,
        },
      });

      return 'Đã xóa công việc ';
    } catch (error) {
      console.error('Error deleting user:', error);
      return 'Đã xảy ra lỗi khi xóa công việc ';
    }
  }
}
