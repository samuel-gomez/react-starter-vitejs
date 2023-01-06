import { useState, useEffect, ImgHTMLAttributes } from 'react';
import loaderSVG from 'assets/puff.svg';
import './LazyImage.scss';

const getPath = (name: TloadImage, ext = 'svg') => `../../../../public/images/${name}.${ext}`;

type TloadImage = string;
export const loadImage = (name: TloadImage, ext = 'svg', getPathFn = getPath) => import(getPathFn(name, ext));

const Loading = () => <img className="af-lasyimage" src={loaderSVG} alt="loading..." />;

type TuseLoadImage = {
  name: TloadImage;
  loadImageFn?: typeof loadImage;
  initState?: string | null;
};

const useLoadImage = ({ name, loadImageFn = loadImage, initState = null }: TuseLoadImage) => {
  const [stateimage, setStateImage] = useState(initState);

  useEffect(() => {
    if (stateimage === null && name) {
      const fileTab = name.split('.');
      loadImageFn(fileTab[0], fileTab[1])
        .then(image => setStateImage(image.default))
        .catch(error => setStateImage(error));
    }
  }, [stateimage, loadImageFn, name]);

  return { stateimage, setStateImage };
};

type TLasyImage = ImgHTMLAttributes<HTMLImageElement> & {
  name: TloadImage;
  alt: string;
  useLoadImageFn?: typeof useLoadImage;
};

const LasyImage = ({ name, alt, useLoadImageFn = useLoadImage, ...rest }: TLasyImage) => {
  const { stateimage } = useLoadImageFn({ name });
  return stateimage !== null ? <img {...rest} src={stateimage} alt={alt} /> : <Loading />;
};

export default LasyImage;
