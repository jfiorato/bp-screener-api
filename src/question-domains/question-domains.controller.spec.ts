import { Test, TestingModule } from '@nestjs/testing';
import { QuestionDomainsController } from './question-domains.controller';
import { QuestionDomainsService } from './question-domains.service';

describe('QuestionDomainsController', () => {
  let controller: QuestionDomainsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionDomainsController],
      providers: [QuestionDomainsService],
    }).compile();

    controller = module.get<QuestionDomainsController>(
      QuestionDomainsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
