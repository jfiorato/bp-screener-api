export class ScreenerAnswer {
  question_id: string;
  value: number;
}

export class SubmitScreenerDto {
  answers: ScreenerAnswer[];
}
