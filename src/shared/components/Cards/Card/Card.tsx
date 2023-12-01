import type { ReactNode } from 'react';
import LasyImage from 'shared/components/LazyImage';
import { STORYBOOK, DESIGN_SYSTEM } from 'shared/constants';
import Icons from 'shared/components/Icons';

type TCardLink = {
  text: string;
  path: string;
};

export type TCard = {
  storybook?: TCardLink;
  designSystem?: TCardLink;
  title: ReactNode;
  picture: { name: string; alt: string };
};

const Card = ({ storybook, designSystem, title, picture: { name, alt } }: TCard) => (
  <article className="af-card af-skeleton">
    <LasyImage className="af-card__image" name={name} alt={alt} />
    <header className="af-card__header">
      <h3 className="af-card__title">{title}</h3>
    </header>
    <section className="af-card__content">
      <a
        aria-label="Voir le design system"
        className="btn af-btn--circle af-btn--svg"
        href={`${DESIGN_SYSTEM}${designSystem?.path ?? ''}`}
        title={storybook?.text ?? ''}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icons icon="slash" viewBox="0 0 342.988 280" />
      </a>
      <a
        aria-label="Voir le storybook"
        className="btn af-btn--circle af-btn--storybook"
        href={`${STORYBOOK}${storybook?.path ?? ''}`}
        title={storybook?.text ?? ''}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icons icon="storybook" viewBox="0 0 9.6 12" />
      </a>
    </section>
  </article>
);

export default Card;
