import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VerificationCodeSchema } from '../../models/verificationCode';
import { VerificationCodeController } from './verificationCode.controller';
import { VerificationCodeService } from './verificationCode.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'VerificationCode', schema: VerificationCodeSchema },
    ]),
  ],
  controllers: [VerificationCodeController],
  providers: [VerificationCodeService],
  exports: [VerificationCodeService],
})
export class VerificationCodeModule {}
