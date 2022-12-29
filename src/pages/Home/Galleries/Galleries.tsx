import GALLERIES from './constants';
import Gallery from './Gallery';
import './Galleries.scss';

const Galleries = ({ galleries = GALLERIES }) => (
  <>
    {galleries.map(({ title, ...rest }) => (
      <Gallery title={title} key={title} {...rest} />
    ))}
  </>
);

export default Galleries;
