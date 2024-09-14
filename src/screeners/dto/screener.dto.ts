export class ScreenerAnswerOption {
  title: string;
  value: number;
}

export class ScreenerQuestion {
  question_id: string;
  title: string;
}

export class ScreenerSection {
  type: string;
  title: string;
  answers: ScreenerAnswerOption[];
  questions: ScreenerQuestion[];
}

export class ScreenerContent {
  display_name: string;
  sections: ScreenerSection;
}

export class ScreenerDto {
  id: string;
  name: string;
  disorder: string;
  full_name: string;
  content: ScreenerContent;
}
