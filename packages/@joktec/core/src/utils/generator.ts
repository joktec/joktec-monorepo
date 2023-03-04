import { v4 as uuidv4 } from 'uuid';

export const generateOTP = (otpLength: number = 6) => {
  const baseNumber = Math.pow(10, otpLength - 1);
  let number = Math.floor(Math.random() * baseNumber);
  if (number < baseNumber) {
    number += baseNumber;
  }
  return number;
};

export const generateUUID = (): string => uuidv4();
