import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { JobDetailService } from './job-detail.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadDto } from 'src/uploadDTO';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { log } from 'console';

@ApiTags('Job Detail')
@Controller('job-detail')
export class JobDetailController {
  constructor(private readonly jobDetailService: JobDetailService) {}

  // LẤY HẾT CÁC CÔNG VIỆC CHI TIẾT
  @Get('get-all')
  getAllJobDetail() {
    return this.jobDetailService.getAllJobDetail();
  }

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
  // addJobDetail() {
  //   return this.jobDetailService.addJobDetail();
  // }
  upload(
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
}
