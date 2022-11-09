interface IMyOverall {
  quiz: string;
  userId: string;
}
interface IPlay {
  quiz: string;
  userId: string;
}
interface IHandlePlayGame {
  jobseeker: string;
  quizzObject: any;
}

interface IHandlePlayAgain {
  jobseeker: string;
  quizzObject: any;
  quizzMatchLogObject: any;
}

interface ICreateMyMatchLog {
  jobseeker: string;
  quizzObject: any;
}

interface ICheckIn {
  quiz: string;
  userId: string;
}

interface IHanleEarnCheckIn {
  jobseeker: string;
  checkInAt: any;
}

export {
  IMyOverall,
  IPlay,
  IHandlePlayGame,
  IHandlePlayAgain,
  ICreateMyMatchLog,
  ICheckIn,
  IHanleEarnCheckIn,
};
