import { Button } from '@axa-fr/react-toolkit-all';
import { type ReactElement } from 'react';
import { useForm, type Control, type FieldValues, type SubmitHandler } from 'react-hook-form';

export const LABEL_SUBMIT = 'Valider';
export const FORM_ADD_MEMBERS = 'form-add-members';
export const ERROR_MESSAGE = 'Champ obligatoire';

export const FieldInputWithControl = ({ renderField }: { renderField: (control: Control<FieldValues, unknown>) => ReactElement }) => {
  const { handleSubmit, control } = useForm();
  const onValid: SubmitHandler<FieldValues> = dataSubmitted => dataSubmitted;

  return (
    <form onSubmit={handleSubmit(onValid)} id={FORM_ADD_MEMBERS}>
      {renderField(control)}

      <Button type="submit" classModifier="hasiconRight">
        <span className="af-btn__text">{LABEL_SUBMIT}</span>
      </Button>
    </form>
  );
};
