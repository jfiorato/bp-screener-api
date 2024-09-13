import { Injectable } from '@nestjs/common';
import { QuestionDomain } from './entities/question-domain.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDomainDto } from './dto/create-question-domain.dto';

@Injectable()
export class QuestionDomainsService {
  constructor(
    @InjectRepository(QuestionDomain)
    private questionDomainRepository: Repository<QuestionDomain>,
  ) {}

  async create(
    createQuestionDomainDto: CreateQuestionDomainDto,
  ): Promise<QuestionDomain> {
    const questionDomain = new QuestionDomain();
    questionDomain.question_id = createQuestionDomainDto.question_id;
    questionDomain.domain = createQuestionDomainDto.domain;
    return await this.questionDomainRepository.save(questionDomain);
  }

  async findAll(): Promise<QuestionDomain[]> {
    return await this.questionDomainRepository.find();
  }

  async findOne(id: string): Promise<QuestionDomain> {
    return await this.questionDomainRepository.findOneBy({ question_id: id });
  }

  async remove(id: string): Promise<void> {
    await this.questionDomainRepository.delete({ question_id: id });
  }
}
