export const successResponse = (data) => {
  return {
    success: true,
    statusCode: 200,
    statusMessage: 'Success',
    data,
  };
};

export const failedResponse = (statusCode, statusMessage) => {
  return {
    success: false,
    statusCode,
    statusMessage,
    data: null,
    errors: null,
  };
};
