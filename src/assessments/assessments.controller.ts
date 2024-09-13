import { Body, Controller, Post } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { SubmitAssessmentDto } from './dto/submit-assessment.dto';

@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post()
  create(@Body() submitAssessmentDto: SubmitAssessmentDto) {
    return this.assessmentsService.submit(submitAssessmentDto);
  }
}
