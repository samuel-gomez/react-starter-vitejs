import ResiliencePage, { type TResiliencePageContainer } from 'shared/components/ResiliencePage';
import './Unauthorize.scss';
import { CODE, MESSAGE, TITLE } from './constants';

type TUnauthorize = Omit<TResiliencePageContainer, 'title'> & {
  title?: TResiliencePageContainer['title'];
  ResiliencePageCmpt?: typeof ResiliencePage;
};

const Unauthorize = ({
  title = TITLE,
  message = MESSAGE,
  code = CODE,
  subtitlePartOne = 'forbidden',
  subtitlePartTwo = 'found',
  backhome = false,
  classModifier = 'unauthorize',
  ResiliencePageCmpt = ResiliencePage,
}: TUnauthorize) => (
  <ResiliencePageCmpt
    title={title}
    message={message}
    code={code}
    subtitlePartOne={subtitlePartOne}
    subtitlePartTwo={subtitlePartTwo}
    backhome={backhome}
    classModifier={classModifier}
  />
);

export default Unauthorize;
