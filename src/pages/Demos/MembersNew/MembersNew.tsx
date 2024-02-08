import { Button } from '@axa-fr/react-toolkit-all';
import Layout, { type TLayoutPage } from 'Layout';
import type { Control, FieldValues, UseFormReset } from 'react-hook-form';
import { Col, Row } from 'shared/components/Grid';
import { FieldSelectInput, FieldTextInput } from 'shared/components/form';
import type { TReturnSetRules } from './MembersNew.helper';
import {
  CIVILITY,
  FIRSTNAME,
  FORM_ADD_MEMBERS,
  LABEL_CANCEL,
  LABEL_CIVILITY,
  LABEL_FIRSTNAME,
  LABEL_LASTNAME,
  LABEL_SUBMIT,
  LASTNAME,
  OPTIONS_CIVILITY,
  TITLE,
  TITLE_BAR,
} from './constants';

export const ButtonIconLoading = ({ isLoading }: { isLoading: boolean }) => (
  <>
    {isLoading ? (
      <i role="img" aria-label="refresh" className="glyphicon glyphicon-refresh" />
    ) : (
      <i role="img" aria-label="plus" className="glyphicon glyphicon-plus" />
    )}
  </>
);

export type TMembersNew = TLayoutPage & {
  rules: TReturnSetRules;
  reset: UseFormReset<FieldValues>;
  control: Control<FieldValues, unknown>;
  onSubmit: (e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined) => Promise<void>;
  isLoading: boolean;
};

const MembersNew = ({ rules, onSubmit, control, reset, titleBar = TITLE_BAR, title = TITLE, isLoading = false }: TMembersNew) => (
  <Layout propsTitle={{ title: titleBar, backHome: true }}>
    <h2 className="af-title--content">{title}</h2>

    <form onSubmit={onSubmit} id={FORM_ADD_MEMBERS}>
      <fieldset>
        <legend>Informations générales</legend>
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
              <ButtonIconLoading isLoading={isLoading} />
              <span className="af-btn__text">{LABEL_SUBMIT}</span>
            </Button>
          </Col>
        </Row>
      </fieldset>
    </form>
  </Layout>
);

export default MembersNew;
