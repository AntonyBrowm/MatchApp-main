import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateUserDTO,
  GetUserDTO,
  GetUsersDTO,
  LoginDTO,
  VerifyDTO,
} from '@enroute/definitions';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { UserDocument } from '../../models/user';
import { AboutService } from '../about/about.service';
import { VerificationCodeService } from '../verificationCode/verificationCode.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private aboutService: AboutService,
    private verificationCodeService: VerificationCodeService
  ) {}

  async get(userFilter: GetUserDTO): Promise<UserDocument | undefined> {
    const user = await this.userModel
      .findOne({
        userFilter,
      })
      .populate({
        path: 'about',
        populate: { path: 'personal_questions', model: 'PersonalQuestion' },
      });

    return user;
  }

  async getAll(queryOptions: GetUsersDTO): Promise<UserDocument[]> {
    return await this.userModel
      .find()
      .limit(
        queryOptions.limit && queryOptions.limit > 0 && queryOptions.limit <= 10
          ? Math.round(queryOptions.limit)
          : 10
      )
      .skip(
        queryOptions.offset &&
          queryOptions.offset > 0 &&
          queryOptions.offset <= 10
          ? Math.round(queryOptions.offset)
          : 0
      );
  }

  async create(user: CreateUserDTO): Promise<UserDocument> {
    if (user.confirmPassword !== user.password) {
      throw new BadRequestException('Password confirmation is difference');
    }

    const createdAbout = await this.aboutService.create(user.about);

    const createdUser = await this.userModel.create({
      ...user,
      about: createdAbout._id,
      verified: false,
    });

    await this.verificationCodeService.send(createdUser._id, createdUser.email);

    return createdUser;
  }

  async findByLogin(info: LoginDTO): Promise<UserDocument | undefined> {
    const user = await this.userModel.findOne({
      password: info.password,
      email: info.email,
    });

    return user;
  }

  async verify(verifyDTO: VerifyDTO) {
    const code = await this.verificationCodeService.get(verifyDTO.user_id);

    if (!code) {
      throw new BadRequestException('Code not found');
    }

    const result = await this.userModel.updateOne(
      { _id: new ObjectId(verifyDTO.user_id) },
      {
        verified: true,
      }
    );

    if (result.modifiedCount === 0) {
      throw new BadRequestException('Code not found');
    }
  }
}
