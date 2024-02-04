import { ApiProperty } from '@nestjs/swagger';

export class UploadDto {
  @ApiProperty()
  ten_chi_tiet: string;

  @ApiProperty()
  ma_loai_cong_viec: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  avatar: any;
}
