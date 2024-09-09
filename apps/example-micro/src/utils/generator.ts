export const truncateText = (text: string, maxLength = 80): string => {
  const max = maxLength - 3;
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, max) + '...';
};
