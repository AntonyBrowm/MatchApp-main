import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import {
  AuthRoutes,
  CreateUserDTO,
  GetUserDTO,
  GetUsersDTO,
  VerifyDTO,
} from '@enroute/definitions';
import { UserDocument } from '../../models/user';

import { UserService } from './user.service';

@Controller(AuthRoutes.USER.prefix)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(AuthRoutes.USER.GET.path)
  async get(@Body() getUserDTO: GetUserDTO): Promise<UserDocument> {
    return await this.userService.get(getUserDTO);
  }

  @Get(AuthRoutes.USER.GET_ALL.path)
  async getAll(@Body() getUsersDTO: GetUsersDTO): Promise<UserDocument[]> {
    return await this.userService.getAll(getUsersDTO);
  }

  @Post(AuthRoutes.USER.CREATE.path)
  async create(@Body() createUserDTO: CreateUserDTO): Promise<UserDocument> {
    return this.userService.create(createUserDTO);
  }

  @Patch(AuthRoutes.USER.VERIFY.path)
  async verify(@Body() verifyDTO: VerifyDTO): Promise<void> {
    return this.userService.verify(verifyDTO);
  }
}
