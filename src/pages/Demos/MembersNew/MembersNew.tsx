import Button from '@axa-fr/react-toolkit-button/dist/esm/index';
import type { Control, FieldValues, UseFormReset } from 'react-hook-form';
import { FieldTextInput, FieldSelectInput } from 'shared/components/form';
import { Col, Row } from 'shared/components/Grid';
import Layout, { type TLayoutPage } from 'Layout';
import {
  TITLE_BAR,
  TITLE,
  CIVILITY,
  LABEL_CIVILITY,
  OPTIONS_CIVILITY,
  LABEL_SUBMIT,
  FIRSTNAME,
  LABEL_FIRSTNAME,
  LASTNAME,
  LABEL_LASTNAME,
  LABEL_CANCEL,
  FORM_ADD_MEMBERS,
} from './constants';
import type { TReturnSetRules } from './MembersNew.helper';

export type TMembersNew = TLayoutPage & {
  rules: TReturnSetRules;
  reset: UseFormReset<FieldValues>;
  control: Control<FieldValues, unknown>;
  onSubmit: (e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined) => Promise<void>;
  isLoading: boolean;
};

const MembersNew = ({ rules, onSubmit, control, reset, titleBar = TITLE_BAR, title = TITLE, isLoading = false }: TMembersNew) => (
  <Layout propsTitle={{ title: titleBar, backHome: true }}>
    <h1 className="af-title--content">{title}</h1>
    <form onSubmit={onSubmit} id={FORM_ADD_MEMBERS}>
      <FieldSelectInput control={control} rules={rules[CIVILITY]} name={CIVILITY} label={LABEL_CIVILITY} options={OPTIONS_CIVILITY} />
      <FieldTextInput control={control} rules={rules[FIRSTNAME]} name={FIRSTNAME} label={LABEL_FIRSTNAME} />
      <FieldTextInput control={control} rules={rules[LASTNAME]} name={LASTNAME} label={LABEL_LASTNAME} />
      <Row>
        <Col md={2}>
          <Button type="reset" classModifier="reverse" onClick={reset}>
            <span className="af-btn__text">{LABEL_CANCEL}</span>
          </Button>
        </Col>
        <Col md={10}>
          <Button type="submit" classModifier="hasiconRight" aria-disabled={isLoading}>
            {isLoading ? (
              <span role="img" aria-label="is loading" className="glyphicon glyphicon-refresh" />
            ) : (
              <span role="img" aria-label="plus" className="glyphicon glyphicon-plus" />
            )}
            <span className="af-btn__text">{LABEL_SUBMIT}</span>
          </Button>
        </Col>
      </Row>
    </form>
  </Layout>
);

export default MembersNew;
