import withClassNameModifier, { type TwithClassNameModifier } from 'shared/hoc/WithClassNameModifier';
import './Skeleton.scss';

type TSkeleton = {
  className?: string;
} & TwithClassNameModifier;

const DEFAULT_CLASSNAME = 'af-skeleton';

const Skeleton = withClassNameModifier(
  ({ className }: TSkeleton) => <div aria-busy="true" aria-label="Skeleton Loader" role="alert" className={className} />,
  { defaultClassName: DEFAULT_CLASSNAME },
);

export default Skeleton;
