import { Module } from '@nestjs/common';
import { ScreenersService } from './screeners.service';
import { ScreenersController } from './screeners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionDomain } from 'src/question-domains/entities/question-domain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionDomain])],
  controllers: [ScreenersController],
  providers: [ScreenersService],
})
export class ScreenersModule {}
