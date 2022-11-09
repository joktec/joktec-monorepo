interface IAnswer {
  question: string;
  userId: string;
  answers: string[];
  answertext?: string;
}

interface ICheckAnswer {
  questionId: number;
  answersIds: number[];
}

interface IGenMetaData {
  questionObject: any;
  answerList: any[];
}

interface IUpdateScore {
  quizzMatchLogObject: any;
  jobseekerId: string;
  scoreAnswered: number;
  quizzObject: any;
}

export { IAnswer, ICheckAnswer, IGenMetaData, IUpdateScore };
