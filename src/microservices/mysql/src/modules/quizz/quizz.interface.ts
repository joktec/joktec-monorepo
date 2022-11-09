interface IMyOverall {
  quiz: string;
  userId: string;
}
interface IPlay {
  quiz: string;
  userId: string;
}
interface IHandlePlayGame {
  jobseekerId: string;
  quizzObject: any;
}

interface IHandlePlayAgain {
  jobseekerId: string;
  quizzObject: any;
  quizzMatchLogObject: any;
}

interface ICreateMyMatchLog {
  jobseekerId: string;
  quizzObject: any;
}

interface ICheckIn {
  quiz: string;
  userId: string;
}

interface IHanleEarnCheckIn {
  jobseekerId: string;
  checkInAt: any;
}

interface IHandleCalculateRemainTurn {
  jobseekerId: string;
  quizzMatchLogId: number;
}

export {
  IMyOverall,
  IPlay,
  IHandlePlayGame,
  IHandlePlayAgain,
  ICreateMyMatchLog,
  ICheckIn,
  IHanleEarnCheckIn,
  IHandleCalculateRemainTurn,
};
