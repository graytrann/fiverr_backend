import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBody, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BinhLuan } from '@prisma/client';

class commentDTO {
  @ApiProperty()
  ma_cong_viec: string;

  @ApiProperty()
  ma_nguoi_binh_luan: string;

  @ApiProperty()
  ngay_binh_luan: string;

  @ApiProperty()
  noi_dung: string;

  @ApiProperty()
  sao_binh_luan: string;
}

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // LẤY HẾT CÁC BÌNH LUẬN
  @Get('get-all')
  getAllComment() {
    return this.commentService.getAllComment();
  }

  // LẤY BÌNH LUẬN THEO ID
  @Get('getById')
  @ApiQuery({ name: 'commentId', type: 'number' })
  getById(@Query('commentId') commentId: string) {
    const parsedCommentId = parseInt(commentId, 10);
    return this.commentService.getCommentById(parsedCommentId);
  }

  // THÊM BÌNH LUẬN
  @Post('add')
  @ApiBody({ type: commentDTO })
  addComment(@Body() newComment: Partial<BinhLuan>) {
    return this.commentService.addComment(newComment);
  }

  // SỬA BÌNH LUẬN
  @Put('update')
  @ApiQuery({ name: 'commentId', type: 'number' })
  @ApiBody({ type: commentDTO })
  updateComment(
    @Query('commentId') commentId: string,
    @Body() newComment: Partial<BinhLuan>,
  ) {
    const parsedCommentId = parseInt(commentId, 10);
    return this.commentService.updateComment(parsedCommentId, newComment);
  }

  // XÓA BÌNH LUẬN
  @Delete('delete')
  @ApiQuery({ name: 'commentId', type: 'number' })
  deleteComment(@Query('commentId') commentId: string) {
    const parsedCommentId = parseInt(commentId, 10);
    return this.commentService.deleteComment(parsedCommentId);
  }
}
