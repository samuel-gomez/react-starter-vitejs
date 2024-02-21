import { TextInput } from '@axa-fr/react-toolkit-all';
import { MessageTypes } from '@axa-fr/react-toolkit-form-core';
import { type ComponentPropsWithoutRef } from 'react';
import { Controller } from 'react-hook-form';
import { onChangeValue } from './form.helper';

type TTextInput = ComponentPropsWithoutRef<typeof TextInput>;
type TController = Partial<ComponentPropsWithoutRef<typeof Controller>>;

export type TFieldTextInput = TController & TTextInput;

const FieldTextInput = ({
  control,
  rules,
  defaultValue = '',
  name = 'name',
  label = 'label',
  forceDisplayMessage = true,
  messageType = MessageTypes.error,
  ...otherTextInputProps
}: TFieldTextInput) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    rules={rules}
    render={({ field: { onChange, onBlur, value }, fieldState }) => (
      <TextInput
        id={name}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChangeValue(onChange)}
        label={label}
        forceDisplayMessage={forceDisplayMessage}
        messageType={messageType}
        message={fieldState.error?.message}
        {...otherTextInputProps}
      />
    )}
  />
);

export default FieldTextInput;
