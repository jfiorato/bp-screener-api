import { Injectable } from '@nestjs/common';
import {
  AssessmentAnswer,
  SubmitAssessmentDto,
} from './dto/submit-assessment.dto';
import { AssessmentResultDto } from './dto/assessment-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionDomain } from 'src/question-domains/entities/question-domain.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssessmentsService {
  constructor(
    @InjectRepository(QuestionDomain)
    private questionDomainRepository: Repository<QuestionDomain>,
  ) {}

  async submit(
    submitAssessmentDto: SubmitAssessmentDto,
  ): Promise<AssessmentResultDto> {
    // Fetch the question domains
    const questionDomains = await this.questionDomainRepository.find();

    // Turn the question domains into a key/value pair
    const questionDomainsMap: { [question_id: string]: string } = {};
    questionDomains.forEach((questionDomain: QuestionDomain) => {
      questionDomainsMap[questionDomain.question_id] = questionDomain.domain;
    });

    // Setup map of domains for collecting scores
    const domainMap: { [domain: string]: number } = {
      depression: 0,
      mania: 0,
      anxiety: 0,
      substance_use: 0,
    };

    // Collect answer values into the domain score map
    submitAssessmentDto.answers.forEach((answer: AssessmentAnswer) => {
      const domain = questionDomainsMap[answer.question_id];
      domainMap[domain] = domainMap[domain] + answer.value;
    });

    // Evaluate results and return response
    const result = new AssessmentResultDto();
    result.results = [];

    if (domainMap['depression'] >= 2 || domainMap['anxiety'] >= 2) {
      result.results.push('PHQ-9');
    }

    if (domainMap['mania'] >= 2) {
      result.results.push('ASRM');
    }

    if (domainMap['substance_use'] >= 1) {
      result.results.push('ASSIST');
    }

    return result;
  }
}
