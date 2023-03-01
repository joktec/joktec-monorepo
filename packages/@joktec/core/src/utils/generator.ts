import { uuid } from 'uuidv4';

export const generateOTP = (otpLength: number = 6) => {
  const baseNumber = Math.pow(10, otpLength - 1);
  let number = Math.floor(Math.random() * baseNumber);
  if (number < baseNumber) {
    number += baseNumber;
  }
  return number;
};

export const generateUUID = (): string => uuid();
