import { type ReactNode } from 'react';
import { type THeader } from '../Headers/Header';

export type Tcol = Omit<THeader, 'key'> & {
  hover?: string;
  children?: ReactNode;
  classModifier?: string;
};
