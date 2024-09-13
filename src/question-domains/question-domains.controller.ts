import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QuestionDomainsService } from './question-domains.service';
import { CreateQuestionDomainDto } from './dto/create-question-domain.dto';

@Controller('question-domains')
export class QuestionDomainsController {
  constructor(
    private readonly questionDomainsService: QuestionDomainsService,
  ) {}

  @Post()
  create(@Body() createQuestionDomainDto: CreateQuestionDomainDto) {
    return this.questionDomainsService.create(createQuestionDomainDto);
  }

  @Get()
  findAll() {
    return this.questionDomainsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionDomainsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionDomainsService.remove(id);
  }
}
