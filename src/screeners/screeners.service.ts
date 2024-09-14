import { Injectable } from '@nestjs/common';
import { ScreenerAnswer, SubmitScreenerDto } from './dto/submit-screener.dto';
import { ScreenerResultDto } from './dto/screener-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionDomain } from 'src/question-domains/entities/question-domain.entity';
import { Repository } from 'typeorm';
import { ScreenerDto } from './dto/screener.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ScreenersService {
  constructor(
    @InjectRepository(QuestionDomain)
    private questionDomainRepository: Repository<QuestionDomain>,
  ) {}

  fetch(): ScreenerDto {
    return plainToClass(ScreenerDto, this.getScreener());
  }

  async submit(
    submitScreenerDto: SubmitScreenerDto,
  ): Promise<ScreenerResultDto> {
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
    submitScreenerDto.answers.forEach((answer: ScreenerAnswer) => {
      const domain = questionDomainsMap[answer.question_id];
      domainMap[domain] = domainMap[domain] + answer.value;
    });

    // Evaluate results and return response
    const result = new ScreenerResultDto();
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

  private getScreener(): object {
    return {
      id: 'abcd-123',
      name: 'BPDS',
      disorder: 'Cross-Cutting',
      content: {
        sections: [
          {
            type: 'standard',
            title:
              'During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?',
            answers: [
              {
                title: 'Not at all',
                value: 0,
              },
              {
                title: 'Rare, less than a day or two',
                value: 1,
              },
              {
                title: 'Several days',
                value: 2,
              },
              {
                title: 'More than half the days',
                value: 3,
              },
              {
                title: 'Nearly every day',
                value: 4,
              },
            ],
            questions: [
              {
                question_id: 'question_a',
                title: 'Little interest or pleasure in doing things?',
              },
              {
                question_id: 'question_b',
                title: 'Feeling down, depressed, or hopeless?',
              },
              {
                question_id: 'question_c',
                title:
                  'Sleeping less than usual, but still have a lot of energy?',
              },
              {
                question_id: 'question_d',
                title:
                  'Starting lots more projects than usual or doing more risky things than usual?',
              },
              {
                question_id: 'question_e',
                title:
                  'Feeling nervous, anxious, frightened, worried, or on edge?',
              },
              {
                question_id: 'question_f',
                title: 'Feeling panic or being frightened?',
              },
              {
                question_id: 'question_g',
                title: 'Avoiding situations that make you feel anxious?',
              },
              {
                question_id: 'question_h',
                title:
                  'Drinking at least 4 drinks of any kind of alcohol in a single day?',
              },
            ],
          },
        ],
        display_name: 'BDS',
      },
      full_name: 'Blueprint Diagnostic Screener',
    };
  }
}
