import TitleBar from 'Layout/TitleBar';
import withClassNameModifier, { type TwithClassNameModifier } from 'shared/hoc/WithClassNameModifier';
import './ResiliencePage.scss';

export type TResiliencePage = {
  title: string;
  message?: string;
  subtitlePartOne?: string;
  subtitlePartTwo?: string;
  backhome?: boolean;
  code?: string;
  ariaLabel?: string;
} & TwithClassNameModifier;

const DEFAULT_CLASSNAME = 'af-container';

const ResiliencePage = withClassNameModifier(
  ({
    title,
    className,
    message = '',
    subtitlePartOne = '',
    subtitlePartTwo = '',
    code = '404',
    backhome = true,
    ariaLabel = `page error ${code}`,
  }: TResiliencePage) => (
    <>
      <TitleBar backHome={backhome} classModifier="hasstepper" title={title} />
      <main aria-label={ariaLabel} className={`container ${className}`}>
        <h2 className="af-resilience-page__title">
          <div className="af-resilience-page__title-covernumber">
            <span className="af-resilience-page__title-number">{code}</span>
          </div>
          <div className="af-resilience-page__title-covernot">
            <span className="af-resilience-page__title-not">
              {subtitlePartOne}
              <br />
              {subtitlePartTwo}
            </span>
          </div>
        </h2>
        {!!message && <p className="af-resilience-page__message">{message}</p>}
      </main>
    </>
  ),
  { defaultClassName: DEFAULT_CLASSNAME },
);

export default ResiliencePage;
