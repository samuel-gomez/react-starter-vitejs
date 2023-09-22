/* eslint-disable import/prefer-default-export */
import type { TEvent } from 'shared/components/Editor';

export const onChangeValue = (onChange: (value?: string) => void) => (e: TEvent) => onChange(e.value);