import { screen, within } from '@testing-library/dom';

const getBase = (parentLabel = '') => (parentLabel ? within(screen.getByLabelText(parentLabel)) : screen);

export default getBase;
