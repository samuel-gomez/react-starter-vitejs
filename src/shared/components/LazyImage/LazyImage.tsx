import loaderSVG from 'assets/puff.svg';
import { useEffect, useState, type Dispatch, type ImgHTMLAttributes, type SetStateAction } from 'react';
import './LazyImage.scss';

const getPath = (name: string, ext = 'svg') => `../../../../public/images/${name}.${ext}`;

export const importImage = (name: string, ext = 'svg', getPathFn = getPath) => import(getPathFn(name, ext));

const Loading = () => <img className="af-lasyimage" src={loaderSVG} alt="loading..." />;

type TImageState = {
  image?: string | null;
  error?: Error | null;
  loading?: boolean;
};

type TloadImage = {
  name: string;
  setStateImage: Dispatch<SetStateAction<TImageState>>;
  importImageFn?: typeof importImage;
  setStateImageSuccessFn?: typeof setStateImageSuccess;
  setStateImageErrorFn?: typeof setStateImageError;
  setStateImageLoadedFn?: typeof setStateImageLoaded;
};

export const setStateImageSuccess = (image: string) => (prevState: TImageState) => ({ ...prevState, image });
export const setStateImageError = (error: Error) => (prevState: TImageState) => ({ ...prevState, error });
export const setStateImageLoaded = (loading: boolean) => (prevState: TImageState) => ({ ...prevState, loading });

export const loadImage = async ({
  setStateImage,
  name,
  importImageFn = importImage,
  setStateImageSuccessFn = setStateImageSuccess,
  setStateImageErrorFn = setStateImageError,
  setStateImageLoadedFn = setStateImageLoaded,
}: TloadImage) => {
  const fileTab = name.split('.');
  try {
    const image = await importImageFn(fileTab[0], fileTab[1]);
    setStateImage(setStateImageSuccessFn(image.default));
  } catch (error) {
    setStateImage(setStateImageErrorFn(error as Error));
  } finally {
    setStateImage(setStateImageLoadedFn(false));
  }
};

type TuseLoadImage = {
  name: string;
  loadImageFn?: typeof loadImage;
  initState?: TImageState;
};

const useLoadImage = ({ name, loadImageFn = loadImage, initState = { image: null, error: null, loading: true } }: TuseLoadImage) => {
  const [stateImage, setStateImage] = useState(initState);

  useEffect(() => {
    if (stateImage.loading && name) {
      loadImageFn({ setStateImage, name });
    }
  }, [stateImage, loadImageFn, name]);

  return { stateImage, setStateImage };
};

export type TReturnUseLoadImage = ReturnType<typeof useLoadImage>;

type TLasyImage = ImgHTMLAttributes<HTMLImageElement> & {
  name: string;
  alt: string;
  useLoadImageFn?: typeof useLoadImage;
};

type TDisplayImage = Omit<TReturnUseLoadImage['stateImage'], 'loading'> & {
  alt?: string;
};

export const DisplayImage = ({ image, error, alt, ...rest }: TDisplayImage) =>
  image ? <img {...rest} src={image} alt={alt} /> : <p>{error?.message ?? 'Image non chargée'}</p>;

const LasyImage = ({ name, alt, useLoadImageFn = useLoadImage, ...rest }: TLasyImage) => {
  const { stateImage } = useLoadImageFn({ name });
  return stateImage.loading ? <Loading /> : <DisplayImage error={stateImage.error} image={stateImage.image} alt={alt} {...rest} />;
};

export default LasyImage;
