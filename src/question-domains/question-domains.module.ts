import { Module } from '@nestjs/common';
import { QuestionDomainsService } from './question-domains.service';
import { QuestionDomainsController } from './question-domains.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionDomain } from './entities/question-domain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionDomain])],
  controllers: [QuestionDomainsController],
  providers: [QuestionDomainsService],
})
export class QuestionDomainsModule {}
