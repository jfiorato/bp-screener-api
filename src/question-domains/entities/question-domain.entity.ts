import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class QuestionDomain {
  @PrimaryColumn()
  question_id: string;

  @Column()
  domain: string;
}
