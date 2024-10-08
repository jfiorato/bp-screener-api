import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionDomainsModule } from './question-domains/question-domains.module';
import { ScreenersModule } from './screeners/screeners.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    QuestionDomainsModule,
    ScreenersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
