import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { VerificationCodeDocument } from '../../models/verificationCode';

@Injectable()
export class VerificationCodeService {
  constructor(
    @InjectModel('VerificationCode')
    private verificationCodeModel: Model<VerificationCodeDocument>,
    private mailerService: MailerService
  ) {}

  async get(user_id: string): Promise<VerificationCodeDocument | undefined> {
    const verificationCode = await this.verificationCodeModel.findOne({
      user: user_id,
    });

    return verificationCode;
  }

  async send(user_id: Types.ObjectId, email: string): Promise<void> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let newVerificationCode = '';

    for (let i = 0; i < 6; i++) {
      newVerificationCode +=
        characters[Math.round(Math.random() * (characters.length - 1))];
    }

    const lastCode = await this.verificationCodeModel.findOne({
      user: user_id,
    });

    if (lastCode) {
      await this.verificationCodeModel.updateOne(
        { user: user_id },
        {
          code: newVerificationCode,
          requested_date: new Date(),
        }
      );
    } else {
      await this.verificationCodeModel.create({
        code: newVerificationCode,
        user: user_id,
      });
    }
    
    await this.mailerService.sendMail({
      from: 'matchlovetests@gmail.com',
      to: email,
      subject: 'Tu codigo de verificación',
      template: './verificationMail',
      context: {
        code: newVerificationCode,
      },
    });
  }
}
