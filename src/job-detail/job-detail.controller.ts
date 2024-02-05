import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { JobDetailService } from './job-detail.service';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UploadDto } from 'src/uploadDTO';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Job Detail')
@Controller('job-detail')
export class JobDetailController {
  constructor(private readonly jobDetailService: JobDetailService) {}

  // LẤY HẾT CÁC CÔNG VIỆC CHI TIẾT
  @Get('get-all')
  getAllJobDetail() {
    return this.jobDetailService.getAllJobDetail();
  }

  // LẤY CÔNG VIỆC CHI TIẾT
  @ApiQuery({ name: 'jobDetailId', type: 'number' })
  @Get('getById')
  getJobDetailByID(@Query('jobDetailId') jobDetailId: string) {
    const parsedJobDetailId = parseInt(jobDetailId, 10); // Sử dụng parseInt để chuyển đổi chuỗi thành số
    return this.jobDetailService.getJobDetailByID(parsedJobDetailId);
  }

  // THÊM CÔNG VIỆC CHI TIẾT
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadDto,
  })
  @UseInterceptors(
    FilesInterceptor('avatar', 10, {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + '_' + file.originalname),
      }),
    }),
  )
  @Post('add')
  uploaAdd(
    @UploadedFiles() file: Express.Multer.File[],
    @Body() body: UploadDto,
  ) {
    const newJobDetail = {
      tenChiTiet: body.ten_chi_tiet,
      maLoaiCongViec: parseInt(body.ma_loai_cong_viec, 10),
      hinhAnh: file[0].path,
    };

    return this.jobDetailService.addJobDetail(newJobDetail);
  }

  // CẬP NHẬT JOB DETAIL
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadDto,
  })
  @UseInterceptors(
    FilesInterceptor('avatar', 10, {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + '_' + file.originalname),
      }),
    }),
  )
  @Put('update')
  uploaUpdate(
    @UploadedFiles() file: Express.Multer.File[],
    @Body() body: UploadDto,
    @Query('jobDetailId') jobDetailId: string,
  ) {
    const parsedJobTypeId = parseInt(jobDetailId, 10);
    const newJobDetail = {
      tenChiTiet: body.ten_chi_tiet,
      maLoaiCongViec: parseInt(body.ma_loai_cong_viec, 10),
      hinhAnh: file[0].path,
    };

    return this.jobDetailService.updateJobDetail(parsedJobTypeId, newJobDetail);
  }

  // XÓA JOB DETAIL
  @ApiQuery({ name: 'jobDetailId', type: 'number' })
  @Delete('delete')
  deleteJobType(@Query('jobDetailId') jobDetailId: string) {
    const parsedJobDetailId = parseInt(jobDetailId, 10); // Sử dụng parseInt để chuyển đổi chuỗi thành số
    return this.jobDetailService.deteleJobDetail(parsedJobDetailId);
  }
}
