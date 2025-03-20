export function isClass(variable: any): boolean {
  if (typeof variable !== 'function') return false;
  try {
    variable();
    return false;
  } catch (error) {
    return /^Class constructor/.test(error.message);
  }
}
