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

  // LẤY CHI TIẾT LOẠI CÔNG VIỆC THEO ID
  async getJobDetailByID(
    jobDetailId: number,
  ): Promise<ChiTietLoaiCongViec | null> {
    const jobType = await this.prisma.chiTietLoaiCongViec.findUnique({
      where: {
        id: jobDetailId,
      },
    });
    return jobType;
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

  // UPDATE CÔNG VIỆC CHI TIẾT
  async updateJobDetail(
    jobDetailId: number,
    newJobDetail: any,
  ): Promise<ChiTietLoaiCongViec> {
    // Tìm chi tiết công việc cần cập nhật
    const existingJobDetail = await this.prisma.chiTietLoaiCongViec.findUnique({
      where: { id: jobDetailId },
    });

    // Nếu không tìm thấy chi tiết công việc, trả về null hoặc xử lý theo ý của bạn

    // Tạo object dataToUpdate để chứa các trường cần update
    const dataToUpdate: any = {};

    // Kiểm tra và thêm các trường có giá trị từ newJobDetail vào dataToUpdate
    if (newJobDetail.tenChiTiet !== undefined) {
      dataToUpdate.ten_chi_tiet = newJobDetail.tenChiTiet;
    } else {
      // Nếu không có giá trị mới từ client, giữ nguyên giá trị cũ từ database
      dataToUpdate.ten_chi_tiet = existingJobDetail.ten_chi_tiet;
    }

    if (newJobDetail.maLoaiCongViec !== undefined) {
      dataToUpdate.ma_loai_cong_viec = newJobDetail.maLoaiCongViec;
    } else {
      dataToUpdate.ma_loai_cong_viec = existingJobDetail.ma_loai_cong_viec;
    }

    if (newJobDetail.hinhAnh !== undefined) {
      dataToUpdate.hinh_anh = newJobDetail.hinhAnh;
    } else {
      dataToUpdate.hinh_anh = existingJobDetail.hinh_anh;
    }

    // Tiến hành cập nhật chỉ với các trường có giá trị
    const updatedJobDetail = await this.prisma.chiTietLoaiCongViec.update({
      where: { id: jobDetailId },
      data: dataToUpdate,
      
    });

    return updatedJobDetail;
  }

  // XÓA CÔNG VIỆC CHI TIẾT
  async deteleJobDetail(jobDetailId: number): Promise<string> {
    try {
      const existingJobDetail =
        await this.prisma.chiTietLoaiCongViec.findUnique({
          where: {
            id: jobDetailId,
          },
        });

      if (!existingJobDetail) {
        return 'Công việc chi tiết không tồn tại';
      }

      // Delete the user
      await this.prisma.chiTietLoaiCongViec.delete({
        where: {
          id: jobDetailId,
        },
      });

      return 'Đã xóa công việc chi tiết';
    } catch (error) {
      console.error('Error deleting user:', error);
      return 'Đã xảy ra lỗi khi xóa công việc chi tiết';
    }
  }
}
