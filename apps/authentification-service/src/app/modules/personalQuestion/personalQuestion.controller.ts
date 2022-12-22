import { Body, Controller, Post } from '@nestjs/common';
import {
  AuthRoutes,
  CreateManyQuestionsDTO,
  CreateQuestionDTO,
} from '@enroute/definitions';
import { PersonalQuestionMongo } from '../../models/personalQuestion';

import { PersonalQuestionService } from './personalQuestion.service';

@Controller(AuthRoutes.PERSONAL_QUESTION.prefix)
export class PersonalQuestionController {
  constructor(
    private readonly personalQuestionService: PersonalQuestionService
  ) {}

  @Post(AuthRoutes.PERSONAL_QUESTION.CREATE.path)
  async create(
    @Body() createQuestionDTO: CreateQuestionDTO
  ): Promise<PersonalQuestionMongo> {
    return this.personalQuestionService.create(createQuestionDTO);
  }

  @Post(AuthRoutes.PERSONAL_QUESTION.CREATE_MANY.path)
  async createMany(
    @Body() createManyQuestionsDTO: CreateManyQuestionsDTO
  ): Promise<PersonalQuestionMongo[]> {
    return this.personalQuestionService.createMany(createManyQuestionsDTO);
  }
}
