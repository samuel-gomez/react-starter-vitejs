import type { TLayout } from 'Layout';

export type Tanomaly = {
  label: string;
  detail?: string;
  type?: string;
  iconName?: string;
  code?: string | number;
};

export type TLayoutPage = TLayout & {
  titleBar?: string;
  title?: ReactNode;
};
