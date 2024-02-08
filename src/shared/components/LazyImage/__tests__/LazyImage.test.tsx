import { act, render, waitFor } from '@testing-library/react';
import LasyImage, { loadImage } from '../LazyImage';

const defaultProps = { alt: 'alt', name: '' };

describe('<LasyImage/>', () => {
  it('Should render LasyImage', async () => {
    const { getByAltText, asFragment } = render(<LasyImage {...defaultProps} name="accordion.svg" alt="alt_accordion" />);
    await act(() => {
      getByAltText('loading...');
    });

    await waitFor(() => expect(getByAltText('alt_accordion')).toBeDefined());
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render LasyImage unknown image', async () => {
    const { getByAltText, asFragment } = render(<LasyImage {...defaultProps} name="unknown.svg" alt="alt_unknown" />);
    await act(() => {
      getByAltText('loading...');
    });

    await waitFor(() => expect(getByAltText('alt_unknown')).toBeDefined());
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render LasyImage when loading', () => {
    const { asFragment } = render(<LasyImage {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('loadImage', () => {
  it('Should return import when loadImage have been called with image name and extension', async () => {
    const result = await loadImage('quality', 'png');
    expect(result.default).toEqual('/public/images/quality.png');
  });

  it('Should return import when loadImage have been called with image name and without extension', async () => {
    const result = await loadImage('text');
    expect(result.default).toEqual('/public/images/text.svg');
  });

  it('Should return import when loadImage have been called with image unknown name and without extension', async () => {
    try {
      await loadImage('unknown');
    } catch (error) {
      expect((error as Error).message).toEqual('Unknown variable dynamic import: ../../../../public/images/unknown.svg');
    }
  });
});
