import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { ApiBody, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ThueCongViec } from '@prisma/client';

class HireJobDTO {
  @ApiProperty()
  ma_cong_viec: string;

  @ApiProperty()
  ma_nguoi_thue: string;

  @ApiProperty()
  ngay_thue: string;

  @ApiProperty()
  hoan_thanh: string;
}
@ApiTags('Hire Job')
@Controller('hire-job')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) {}

  // LẤY HẾT CÁC DANH SÁCH THUÊ CÔNG VIỆC
  @Get('get-all')
  getAllHireJob() {
    return this.hireJobService.getAllHireJob();
  }

  // LẤY DANH SÁCH THUÊ CÔNG VIỆC THEO ID
  @ApiQuery({ name: 'jobToHireId', type: 'number' })
  @Get('getById')
  getById(@Query('jobToHireId') jobToHireId: string) {
    const parsedJobToHireId = parseInt(jobToHireId, 10);
    return this.hireJobService.getById(parsedJobToHireId);
  }

  // THUÊ CÔNG VIỆC
  @ApiBody({ type: HireJobDTO })
  @Post('hire')
  hireJob(@Body() hireJobInfo: Partial<ThueCongViec>) {
    return this.hireJobService.hireJob(hireJobInfo);
  }

  // UPDATE THUÊ CÔNG VIỆC
  @ApiBody({ type: HireJobDTO })
  @ApiQuery({ name: 'jobToHireId', type: 'number' })
  @Put('update')
  updateHireJob(
    @Body() hireJobInfo: Partial<ThueCongViec>,
    @Query('jobToHireId') jobToHireId: string,
  ) {
    const parsedJobToHireId = parseInt(jobToHireId, 10);
    return this.hireJobService.update(parsedJobToHireId, hireJobInfo);
  }

  // XÓA THUÊ CÔNG VIỆC
  @ApiQuery({ name: 'jobToHireId', type: 'number' })
  @Delete('delete')
  delete(@Query('jobToHireId') jobToHireId: string){
    const parsedJobToHireId = parseInt(jobToHireId, 10);
    return this.hireJobService.delete(parsedJobToHireId);
  }
}
