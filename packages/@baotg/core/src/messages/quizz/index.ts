// Add prefix (Quizz)
export enum QuizzMessagePattern {
  LIST = 'QuizzMessagePattern_LIST',
  GET = 'QuizzMessagePattern_GET',
  CREATE = 'QuizzMessagePattern_CREATE',
  UPDATE = 'QuizzMessagePattern_UPDATE',
  DELETE = 'QuizzMessagePattern_DELETE',
  BATCH_GET_IDS = 'QuizzMessagePattern_BATCH_GET_IDS',
  MY_OVERALL = 'QuizzMessagePattern_MY_OVERALL',
  PLAY = 'QuizzMessagePattern_PLAY',
  CHECKIN = 'QuizzMessagePattern_CHECKIN',
}

export enum QuizzActionLogMessagePattern {
  LIST = 'QuizzActionLogMessagePattern_LIST',
  GET = 'QuizzActionLogMessagePattern_GET',
  CREATE = 'QuizzActionLogMessagePattern_CREATE',
  UPDATE = 'QuizzActionLogMessagePattern_UPDATE',
  DELETE = 'QuizzActionLogMessagePattern_DELETE',
  BATCH_GET_IDS = 'QuizzActionLogMessagePattern_BATCH_GET_IDS',
}

export enum QuestionMessagePattern {
  LIST = 'QuestionMessagePattern_LIST',
  GET = 'QuestionMessagePattern_GET',
  CREATE = 'QuestionMessagePattern_CREATE',
  UPDATE = 'QuestionMessagePattern_UPDATE',
  DELETE = 'QuestionMessagePattern_DELETE',
  BATCH_GET_IDS = 'QuestionMessagePattern_BATCH_GET_IDS',
}

export enum QuestionCategoryMessagePattern {
  LIST = 'QuestionCategoryMessagePattern_LIST',
  GET = 'QuestionCategoryMessagePattern_GET',
  CREATE = 'QuestionCategoryMessagePattern_CREATE',
  UPDATE = 'QuestionCategoryMessagePattern_UPDATE',
  DELETE = 'QuestionCategoryMessagePattern_DELETE',
  BATCH_GET_IDS = 'QuestionCategoryMessagePattern_BATCH_GET_IDS',
}

export enum QuizzCategoryMessagePattern {
  LIST = 'QuizzCategoryMessagePattern_LIST',
  GET = 'QuizzCategoryMessagePattern_GET',
  CREATE = 'QuizzCategoryMessagePattern_CREATE',
  UPDATE = 'QuizzCategoryMessagePattern_UPDATE',
  DELETE = 'QuizzCategoryMessagePattern_DELETE',
  BATCH_GET_IDS = 'QuizzCategoryMessagePattern_BATCH_GET_IDS',
}

export enum QuizzEventMessagePattern {
  LIST = 'QuizzEventMessagePattern_LIST',
  GET = 'QuizzEventMessagePattern_GET',
  CREATE = 'QuizzEventMessagePattern_CREATE',
  UPDATE = 'QuizzEventMessagePattern_UPDATE',
  DELETE = 'QuizzEventMessagePattern_DELETE',
  BATCH_GET_IDS = 'QuizzEventMessagePattern_BATCH_GET_IDS',
}

export enum QuizzLanguageMessagePattern {
  LIST = 'QuizzLanguageMessagePattern_LIST',
  GET = 'QuizzLanguageMessagePattern_GET',
  CREATE = 'QuizzLanguageMessagePattern_CREATE',
  UPDATE = 'QuizzLanguageMessagePattern_UPDATE',
  DELETE = 'QuizzLanguageMessagePattern_DELETE',
  BATCH_GET_IDS = 'QuizzLanguageMessagePattern_BATCH_GET_IDS',
}

export enum QuizzLogQuestionAnswerMessagePattern {
  LIST = 'QuizzLogQuestionAnswerMessagePattern_LIST',
  GET = 'QuizzLogQuestionAnswerMessagePattern_GET',
  CREATE = 'QuizzLogQuestionAnswerMessagePattern_CREATE',
  UPDATE = 'QuizzLogQuestionAnswerMessagePattern_UPDATE',
  DELETE = 'QuizzLogQuestionAnswerMessagePattern_DELETE',
  BATCH_GET_IDS = 'QuizzLogQuestionAnswerMessagePattern_BATCH_GET_IDS',
}

export enum QuizzMatchLogMessagePattern {
  LIST = 'QuizzMatchLogMessagePattern_LIST',
  GET = 'QuizzMatchLogMessagePattern_GET',
  CREATE = 'QuizzMatchLogMessagePattern_CREATE',
  UPDATE = 'QuizzMatchLogMessagePattern_UPDATE',
  DELETE = 'QuizzMatchLogMessagePattern_DELETE',
  BATCH_GET_IDS = 'QuizzMatchLogMessagePattern_BATCH_GET_IDS',
  MATCH_LOG_ME = 'QuizzMatchLogMessagePattern_MATCH_LOG_ME',
}

export enum QuizzQuestionMessagePattern {
  LIST = 'QuizzQuestionMessagePattern_LIST',
  GET = 'QuizzQuestionMessagePattern_GET',
  CREATE = 'QuizzQuestionMessagePattern_CREATE',
  UPDATE = 'QuizzQuestionMessagePattern_UPDATE',
  DELETE = 'QuizzQuestionMessagePattern_DELETE',
  BATCH_GET_IDS = 'QuizzQuestionMessagePattern_BATCH_GET_IDS',
  ANSWER = 'QuizzQuestionMessagePattern_ANSWER',
}

export enum QuizzQuestionAnswerMessagePattern {
  LIST = 'QuizzQuestionAnswerMessagePattern_LIST',
  GET = 'QuizzQuestionAnswerMessagePattern_GET',
  CREATE = 'QuizzQuestionAnswerMessagePattern_CREATE',
  UPDATE = 'QuizzQuestionAnswerMessagePattern_UPDATE',
  DELETE = 'QuizzQuestionAnswerMessagePattern_DELETE',
  BATCH_GET_IDS = 'QuizzQuestionAnswerMessagePattern_BATCH_GET_IDS',
}

export enum QuizzQuestionMediaMessagePattern {
  LIST = 'QuizzQuestionMediaMessagePattern_LIST',
  GET = 'QuizzQuestionMediaMessagePattern_GET',
  CREATE = 'QuizzQuestionMediaMessagePattern_CREATE',
  UPDATE = 'QuizzQuestionMediaMessagePattern_UPDATE',
  DELETE = 'QuizzQuestionMediaMessagePattern_DELETE',
  BATCH_GET_IDS = 'QuizzQuestionMediaMessagePattern_BATCH_GET_IDS',
}

export enum QuizzScoreLogMessagePattern {
  LIST = 'QuizzScoreLogMessagePattern_LIST',
  GET = 'QuizzScoreLogMessagePattern_GET',
  CREATE = 'QuizzScoreLogMessagePattern_CREATE',
  UPDATE = 'QuizzScoreLogMessagePattern_UPDATE',
  DELETE = 'QuizzScoreLogMessagePattern_DELETE',
  BATCH_GET_IDS = 'QuizzScoreLogMessagePattern_BATCH_GET_IDS',
  RANKING = 'QuizzScoreLogMessagePattern_RANKING',
}

export enum QuizzVoteLogMessagePattern {
  LIST = 'QuizzVoteLogMessagePattern_LIST',
  GET = 'QuizzVoteLogMessagePattern_GET',
  CREATE = 'QuizzVoteLogMessagePattern_CREATE',
  UPDATE = 'QuizzVoteLogMessagePattern_UPDATE',
  DELETE = 'QuizzVoteLogMessagePattern_DELETE',
  BATCH_GET_IDS = 'QuizzVoteLogMessagePattern_GET_DATA_BATCH_GET_IDS',
  VOTE = 'QuizzVoteLogMessagePattern_VOTE',
  MY_VOTE = 'QuizzVoteLogMessagePattern_MY_VOTE',
}
