const colorTags = {
  critical: 'error',
  serious: 'danger',
  minor: 'info',
  moderate: 'info',
};

export type TcolorTags = (typeof colorTags)[keyof typeof colorTags];

export default colorTags;
