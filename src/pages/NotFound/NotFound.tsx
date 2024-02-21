import ResiliencePage, { type TResiliencePageContainer } from 'shared/components/ResiliencePage';
import { CODE, MESSAGE, TITLE } from './constants';

type TNotFound = Omit<TResiliencePageContainer, 'title'> & {
  title?: TResiliencePageContainer['title'];
  ResiliencePageCmpt?: typeof ResiliencePage;
};

const NotFound = ({
  title = TITLE,
  message = MESSAGE,
  code = CODE,
  subtitlePartOne = 'not',
  subtitlePartTwo = 'found',
  ResiliencePageCmpt = ResiliencePage,
}: TNotFound) => (
  <ResiliencePageCmpt title={title} message={message} code={code} subtitlePartOne={subtitlePartOne} subtitlePartTwo={subtitlePartTwo} />
);

export default NotFound;
