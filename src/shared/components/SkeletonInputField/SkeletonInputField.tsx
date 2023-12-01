import type { ReactNode } from 'react';
import Skeleton from 'shared/components/Skeleton';

const SkeletonInputField = ({ label, id }: { label: ReactNode; id?: string }) => (
  <div className="row af-form__group">
    <div className="col-md-2">
      <label htmlFor={id} className="af-form__group-label">
        {label}
      </label>
    </div>
    <Skeleton />
  </div>
);

export default SkeletonInputField;
