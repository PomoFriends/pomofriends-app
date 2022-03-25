import { Time } from './types/miskTypes';

export const extraDigit = (n: number): string =>
  Math.floor(n).toString().padStart(2, '0');

export const formatTime = (seconds: number, hours: boolean): Time => {
  if (hours) {
    const hours = seconds / 3600;
    const min = (seconds / 60) % 60;
    const sec = (seconds % 60) % 60;
    return { hours: hours, minutes: min, seconds: sec };
  }

  const min = (seconds / 60) % 60;
  const sec = (seconds % 60) % 60;
  return { minutes: min, seconds: sec };
};
