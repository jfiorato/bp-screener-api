import { Module } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { AssessmentsController } from './assessments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionDomain } from 'src/question-domains/entities/question-domain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionDomain])],
  controllers: [AssessmentsController],
  providers: [AssessmentsService],
})
export class AssessmentsModule {}
