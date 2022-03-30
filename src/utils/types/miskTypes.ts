import { DefaultMantineColor } from '@mantine/styles/lib/theme/types';

/** Time type */
export type Time = {
  hours?: number;
  minutes: number;
  seconds: number;
};

export type NotificationType = {
  title: string;
  message: string;
  color: DefaultMantineColor | undefined;
  icon?: any | null;
};
