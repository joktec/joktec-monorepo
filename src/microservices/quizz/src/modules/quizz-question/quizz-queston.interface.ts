interface IAnswer {
  question: string;
  userId: string;
  answers: string[];
  answertext?: string;
}

interface ICheckAnswer {
  question: string;
  answers: string[];
}

interface IGenMetaData {
  questionObject: any;
  answerList: any[];
}

interface IUpdateScore {
  quizzMatchLogObject: any;
  jobseeker: string;
  scoreAnswered: number;
  quizzObject: any;
}

export { IAnswer, ICheckAnswer, IGenMetaData, IUpdateScore };
