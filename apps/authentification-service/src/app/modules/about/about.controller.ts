import { Body, Controller, Post } from '@nestjs/common';
import { AuthRoutes, CreateAboutDTO } from '@enroute/definitions';
import { AboutDocument } from '../../models/about';

import { AboutService } from './about.service';

@Controller(AuthRoutes.ABOUT.prefix)
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post(AuthRoutes.ABOUT.CREATE.path)
  async create(@Body() createAboutDTO: CreateAboutDTO): Promise<AboutDocument> {
    return this.aboutService.create(createAboutDTO);
  }
}
