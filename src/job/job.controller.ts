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
import { JobService } from './job.service';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UploadJobDto } from 'src/uploadJobDTO';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // LẤY HẾT CÁC JOB
  @Get('get-all')
  getAllJob() {
    return this.jobService.getAllJob();
  }

  // LẤY JOB THEO ID
  @ApiQuery({ name: 'jobId', type: 'number' })
  @Get('getById')
  getById(@Query('jobId') jobId: string) {
    const parsedJobId = parseInt(jobId, 10); // Sử dụng parseInt để chuyển đổi chuỗi thành số
    return this.jobService.getJoblByID(parsedJobId);
  }

  // THÊM CÔNG VIỆC CHI TIẾT
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadJobDto,
  })
  @UseInterceptors(
    FilesInterceptor('jobPic', 10, {
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
    @Body() body: UploadJobDto,
  ) {
    const newJob = {
      ten_cong_viec: body.ten_cong_viec,
      danh_gia: parseInt(body.danh_gia, 10),
      gia_tien: parseInt(body.gia_tien, 10),
      hinh_anh: file[0].path,
      mo_ta: body.mo_ta,
      mo_ta_ngan: body.mo_ta_ngan,
      sao_cong_viec: parseInt(body.sao_cong_viec, 10),
      ma_chi_tiet_loai: parseInt(body.ma_chi_tiet_loai, 10),
      nguoi_tao: parseInt(body.nguoi_tao, 10),
    };

    return this.jobService.addJob(newJob);
  }

  // CẬP NHẬT JOB
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadJobDto,
  })
  @UseInterceptors(
    FilesInterceptor('jobPic', 10, {
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
    @Body() body: UploadJobDto,
    @Query('jobId') jobId: string,
  ) {
    const parsedJobId = parseInt(jobId, 10);
    const newJob = {
      ten_cong_viec: body.ten_cong_viec,
      danh_gia: parseInt(body.danh_gia, 10),
      gia_tien: parseInt(body.gia_tien, 10),
      hinh_anh: file[0].path,
      mo_ta: body.mo_ta,
      mo_ta_ngan: body.mo_ta_ngan,
      sao_cong_viec: parseInt(body.sao_cong_viec, 10),
      ma_chi_tiet_loai: parseInt(body.ma_chi_tiet_loai, 10),
      nguoi_tao: parseInt(body.nguoi_tao, 10),
    };

    return this.jobService.updateJob(parsedJobId, newJob);
  }

  // XÓA JOB
  @ApiQuery({ name: 'jobId', type: 'number' })
  @Delete('delete')
  deleteJobType(@Query('jobId') jobId: string) {
    const parsedJobId = parseInt(jobId, 10); // Sử dụng parseInt để chuyển đổi chuỗi thành số
    return this.jobService.deteleJob(parsedJobId);
  }
}
