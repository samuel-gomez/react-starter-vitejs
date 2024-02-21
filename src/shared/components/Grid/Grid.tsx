import { type PropsWithChildren } from 'react';

export type TContainer = PropsWithChildren & {
  className?: string;
};
export const Container = ({ children, className = 'container' }: TContainer) => <div className={className}>{children}</div>;

export type TRow = PropsWithChildren & {
  className?: string;
};

export const Row = ({ children, className = 'row af-form__group' }: TRow) => <div className={className}>{children}</div>;

const getColClass = (size?: number, breakpoint?: string) => (size && breakpoint ? `col-${breakpoint}-${size}` : '');

export type TCol = PropsWithChildren & {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
};

export const Col = ({ xs, sm, md, lg, xl, xxl, children }: TCol) => {
  const className = [
    getColClass(xs, 'xs'),
    getColClass(sm, 'sm'),
    getColClass(md, 'md'),
    getColClass(lg, 'lg'),
    getColClass(xl, 'xl'),
    getColClass(xxl, 'xxl'),
  ].join(' ');

  return <div className={className}>{children}</div>;
};
