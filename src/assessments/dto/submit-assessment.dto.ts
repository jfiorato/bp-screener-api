export class AssessmentAnswer {
  question_id: string;
  value: number;
}

export class SubmitAssessmentDto {
  answers: AssessmentAnswer[];
}
