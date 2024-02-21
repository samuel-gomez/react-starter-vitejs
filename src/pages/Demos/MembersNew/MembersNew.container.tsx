import { type ComponentPropsWithoutRef } from 'react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import MembersNew from './MembersNew';
import { setRules } from './MembersNew.helper';
import { useAddMember } from './MembersNew.hook';

export type TMembersNewEnhanced = Partial<ComponentPropsWithoutRef<typeof MembersNew>>;

const MembersNewEnhanced = (membersNewProps: TMembersNewEnhanced) => {
  const { handleSubmit, control, reset } = useForm();
  const { mutate, isPending } = useAddMember({ reset });
  const onSubmitHandler: SubmitHandler<FieldValues> = dataSubmitted => mutate(dataSubmitted);
  return (
    <MembersNew
      {...membersNewProps}
      rules={setRules()}
      onSubmit={handleSubmit(onSubmitHandler)}
      control={control}
      reset={reset}
      isLoading={isPending}
    />
  );
};

export default MembersNewEnhanced;
