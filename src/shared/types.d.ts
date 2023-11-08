export type Tanomaly = {
  label: string;
  detail?: string;
  type?: string;
  iconName?: string;
  code?: string | number;
};

export type TEvent = {
  value?: string;
  id?: string;
  name?: string;
  values?: string[];
};
