import { Controller, Get, Request } from '@nestjs/common';
import { VerificationCodeDocument } from '../../models/verificationCode';

import { VerificationCodeService } from './verificationCode.service';

@Controller('verify')
export class VerificationCodeController {
  constructor(
    private readonly verificationCodeService: VerificationCodeService
  ) {}

  @Get()
  async get(@Request() req): Promise<VerificationCodeDocument | undefined> {
    const code = await this.verificationCodeService.get(req.user.user_id);
    return code;
  }
}
