import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScreenersService } from './screeners.service';
import { SubmitScreenerDto } from './dto/submit-screener.dto';

@Controller('screeners')
export class ScreenersController {
  constructor(private readonly screenerService: ScreenersService) {}

  @Get()
  fetch() {
    return this.screenerService.fetch();
  }

  @Post()
  create(@Body() submitScreenerDto: SubmitScreenerDto) {
    return this.screenerService.submit(submitScreenerDto);
  }
}
