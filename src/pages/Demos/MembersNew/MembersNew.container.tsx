import { ComponentPropsWithoutRef } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAddMember } from './MembersNew.hook';
import MembersNew from './MembersNew';
import { setRules } from './MembersNew.helper';

export type TMembersNewEnhanced = Partial<ComponentPropsWithoutRef<typeof MembersNew>>;

const MembersNewEnhanced = (membersNewProps: TMembersNewEnhanced) => {
  const { handleSubmit, control, reset } = useForm();
  const { mutate, isLoading } = useAddMember({ reset });
  const onSubmitHandler: SubmitHandler<FieldValues> = dataSubmitted => mutate(dataSubmitted);
  return (
    <MembersNew
      {...membersNewProps}
      rules={setRules()}
      onSubmit={handleSubmit(onSubmitHandler)}
      control={control}
      reset={reset}
      isLoading={isLoading}
    />
  );
};

export default MembersNewEnhanced;
