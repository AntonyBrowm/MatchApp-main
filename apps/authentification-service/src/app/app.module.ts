import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PersonalQuestionModule } from './modules/personalQuestion/personalQuestion.module';
import { UserModule } from './modules/user/user.module';
import { transporter } from './helpers/SES';
import path = require('path');
import { VerificationCodeModule } from './modules/verificationCode/verificationCode.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vhojggs.mongodb.net/?retryWrites=true&w=majority`
    ),
    MailerModule.forRoot({
      transport: transporter,
      template: {
        dir: path.resolve(process.cwd(), './apps/authentification-service/src/app/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    UserModule,
    PersonalQuestionModule,
    VerificationCodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
