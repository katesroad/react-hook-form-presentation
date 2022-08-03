import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('classTypes')
  getClassTypes() {
    return this.appService.getClassTypes();
  }

  @Get('limits')
  getLimits(@Query('classType') classType: string) {
    return this.appService.getLimits(classType);
  }
}
