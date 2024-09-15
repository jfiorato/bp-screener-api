import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ScreenersService } from './screeners.service';
import { SubmitScreenerDto } from './dto/submit-screener.dto';

@Controller('screeners')
export class ScreenersController {
  constructor(private readonly screenerService: ScreenersService) {}

  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(@Param('id') _id: string) {
    // Only one screener for this example
    return this.screenerService.fetch();
  }

  @Post()
  create(@Body() submitScreenerDto: SubmitScreenerDto) {
    return this.screenerService.submit(submitScreenerDto);
  }
}
