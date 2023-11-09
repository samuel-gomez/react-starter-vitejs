import { type PropsWithChildren } from 'react';
import withClassNameModifier, { type TwithClassNameModifier } from 'shared/hoc/WithClassNameModifier';
import { DEFAULT_CLASSNAME, MODES, TEXTS } from './constants';
import './Loader.scss';

export type TLoader = PropsWithChildren & {
  className?: string;
  message?: string;
  mode?: keyof typeof MODES;
} & TwithClassNameModifier;

const Loader = withClassNameModifier(
  ({ className, mode = MODES.none, message = TEXTS[mode], children }: TLoader) => (
    <>
      {mode !== MODES.none ? (
        <div role="alert" aria-label={message} aria-live="polite" aria-busy className={className}>
          <p className={`${DEFAULT_CLASSNAME}__spinner`}>{message}</p>
        </div>
      ) : (
        children
      )}
    </>
  ),
  { defaultClassName: DEFAULT_CLASSNAME },
);

export default Loader;
