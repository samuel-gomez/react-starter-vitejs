import { type ReactNode } from 'react';

export type THeader = {
  key: string;
  label?: string;
  field?: string;
  infobulle?: ReactNode;
  isHeader?: boolean;
};
