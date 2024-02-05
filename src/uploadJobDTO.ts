import { ApiProperty } from '@nestjs/swagger';

export class UploadJobDto {
  @ApiProperty()
  ten_cong_viec: string;

  @ApiProperty()
  danh_gia: string;

  @ApiProperty()
  gia_tien: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  jobPic: any;

  @ApiProperty()
  mo_ta: string;

  @ApiProperty()
  mo_ta_ngan: string;

  @ApiProperty()
  sao_cong_viec: string;

  @ApiProperty()
  ma_chi_tiet_loai: string;

  @ApiProperty()
  nguoi_tao: string;
}
