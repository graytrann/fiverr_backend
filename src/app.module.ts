import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';
import { JobTypeModule } from './job-type/job-type.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from './user/user.module';
import { JobDetailModule } from './job-detail/job-detail.module';
import { JobModule } from './job/job.module';
import { HireJobModule } from './hire-job/hire-job.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommentModule,
    JobTypeModule,
    UserModule,
    JobDetailModule,
    JobModule,
    HireJobModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
