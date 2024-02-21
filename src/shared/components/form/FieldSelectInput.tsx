import { SelectInput } from '@axa-fr/react-toolkit-all';
import { MessageTypes } from '@axa-fr/react-toolkit-form-core';
import { type ComponentPropsWithoutRef } from 'react';
import { Controller } from 'react-hook-form';
import { DEFAULT_OPTION_LABEL } from 'shared/constants';
import { onChangeValue } from './form.helper';

type TSelectInput = ComponentPropsWithoutRef<typeof SelectInput>;
type TController = Partial<ComponentPropsWithoutRef<typeof Controller>>;

export type TFieldSelectInput = TController & TSelectInput;

const FieldSelectInput = ({
  control,
  rules,
  options,
  defaultValue = '',
  name = 'name',
  label = 'label',
  forceDisplayMessage = true,
  messageType = MessageTypes.error,
  placeholder = DEFAULT_OPTION_LABEL,
  forceDisplayPlaceholder = true,
  ...otherSelectInputProps
}: TFieldSelectInput) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    rules={rules}
    render={({ field: { onChange, value }, fieldState }) => (
      <SelectInput
        id={name}
        name={name}
        value={value}
        options={options}
        onChange={onChangeValue(onChange)}
        label={label}
        forceDisplayMessage={forceDisplayMessage}
        messageType={messageType}
        message={fieldState.error?.message}
        placeholder={placeholder}
        forceDisplayPlaceholder={forceDisplayPlaceholder}
        {...otherSelectInputProps}
      />
    )}
  />
);

export default FieldSelectInput;
