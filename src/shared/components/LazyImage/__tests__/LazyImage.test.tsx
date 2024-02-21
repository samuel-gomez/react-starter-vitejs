import { act, render, screen, waitFor } from '@testing-library/react';
import LasyImage, { DisplayImage, importImage, loadImage, setStateImageError, setStateImageLoaded, setStateImageSuccess } from '../LazyImage';

const defaultProps = { alt: 'alt', name: '' };

describe('<LasyImage/>', () => {
  it('Should render LasyImage', async () => {
    const { getByAltText, asFragment } = render(<LasyImage {...defaultProps} name="accordion.svg" alt="alt_accordion" />);
    await act(() => {
      getByAltText('loading...');
    });

    await waitFor(() => expect(getByAltText('alt_accordion')).toBeDefined());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <img
          alt="alt_accordion"
          src="/public/images/accordion.svg"
        />
      </DocumentFragment>
    `);
  });

  it('Should render LasyImage unknown image', async () => {
    const { getByAltText, asFragment } = render(<LasyImage {...defaultProps} name="unknown.svg" alt="alt_unknown" />);
    await act(() => {
      getByAltText('loading...');
    });

    await waitFor(() => expect(getByAltText('alt_unknown')).toBeDefined());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <img
          alt="alt_unknown"
          src="/public/images/unknown.svg"
        />
      </DocumentFragment>
    `);
  });

  it('Should render LasyImage when loading', () => {
    const { asFragment } = render(<LasyImage {...defaultProps} />);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <img
          alt="loading..."
          class="af-lasyimage"
          src="/src/assets/puff.svg"
        />
      </DocumentFragment>
    `);
  });
});

describe('importImage', () => {
  it('Should return import when importImage have been called with image name and extension', async () => {
    const result = await importImage('quality', 'png');
    expect(result.default).toEqual('/public/images/quality.png');
  });

  it('Should return import when importImage have been called with image name and without extension', async () => {
    const result = await importImage('text');
    expect(result.default).toEqual('/public/images/text.svg');
  });

  it('Should return import when importImage have been called with image unknown name and without extension', async () => {
    try {
      await importImage('unknown');
    } catch (error) {
      expect((error as Error).message).toEqual('Unknown variable dynamic import: ../../../../public/images/unknown.svg');
    }
  });
});

describe('loadImage', () => {
  const setStateImage = vi.fn();
  const name = 'file.jpg';
  const importImageFn = vi.fn();
  const setStateImageSuccessFn = vi.fn();
  const setStateImageErrorFn = vi.fn();
  const setStateImageLoadedFn = vi.fn();

  it('Should load image et set state success when importImage have resolved', async () => {
    importImageFn.mockResolvedValue({ default: 'public/file.jpg' });
    await loadImage({ setStateImage, name, importImageFn, setStateImageSuccessFn, setStateImageLoadedFn });

    expect(importImageFn).toHaveBeenCalledWith('file', 'jpg');
    expect(setStateImageSuccessFn).toHaveBeenCalledWith('public/file.jpg');
    expect(setStateImageLoadedFn).toHaveBeenCalledWith(false);
  });

  it('Should load image et set state error when importImage have rejected', async () => {
    importImageFn.mockRejectedValue(new Error('erreur de chargement'));
    await loadImage({ setStateImage, name, importImageFn, setStateImageErrorFn, setStateImageLoadedFn });

    expect(importImageFn).toHaveBeenCalledWith('file', 'jpg');
    expect(setStateImageErrorFn).toHaveBeenCalledWith(new Error('erreur de chargement'));
    expect(setStateImageLoadedFn).toHaveBeenCalledWith(false);
  });
});

describe('<DisplayImage />', () => {
  it('Shoud render the image when image is defined', () => {
    render(<DisplayImage image="image.jpg" alt="my image" />);
    const img = screen.getByAltText('my image');

    expect(img).toBeInTheDocument();
  });

  it('Shoud render error message when image is not defined and error is defined', () => {
    render(<DisplayImage alt="my image" error={{ message: 'erreur message', name: 'Error name' }} />);
    const img = screen.getByText('erreur message');

    expect(img).toBeInTheDocument();
  });

  it('Shoud render error message when image is not defined and error is not defined', () => {
    render(<DisplayImage />);
    const img = screen.getByText('Image non chargée');

    expect(img).toBeInTheDocument();
  });
});

describe('setStateImage functions', () => {
  const prevState = {
    image: null,
    error: null,
    loading: true,
  };

  it('Should return the new state with error', async () => {
    const myError = new Error('my error');
    const result = setStateImageError(myError)(prevState);
    expect(result).toMatchObject({
      image: null,
      error: myError,
      loading: true,
    });
  });

  it('Should return the new state with image', async () => {
    const myImage = 'myImage.jpg';
    const result = setStateImageSuccess(myImage)(prevState);
    expect(result).toMatchObject({
      image: myImage,
      error: null,
      loading: true,
    });
  });

  it('Should return the new state with loading', async () => {
    const loading = false;
    const result = setStateImageLoaded(loading)(prevState);
    expect(result).toMatchObject({
      image: null,
      error: null,
      loading,
    });
  });
});
