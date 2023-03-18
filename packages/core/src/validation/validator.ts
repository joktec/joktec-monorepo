export const isCountryCode = (value: string): boolean => /^\+[0-9]{1,3}$/.test(value);
export const isPhone = (value: any): boolean => /^[1-9][0-9]{8}$/.test(value);
export const isOtp = (value: string): boolean => /^\+[0-9]{6}$/.test(value);
