import { Alert, ArticleRestitution, Button, SectionRestitution, SectionRestitutionRow } from '@axa-fr/react-toolkit-all';
import type { ElementType, ReactNode } from 'react';
import { emptyFunction } from 'shared/helpers';
import type { Tanomaly } from 'shared/types.d';
import { DEFAULT_CLASS_ALERT, DEFAULT_CLASS_CONTAINER, RESILIENCE_MODE, WITH_ACTION_CLASS_MODIFIER } from './constants';

type TsetClassModifier<T> = {
  type: string;
  classModifier?: string;
  refetch?: T;
};

export const setClassModifier = <T extends React.MouseEventHandler<HTMLButtonElement>>({ type, classModifier, refetch }: TsetClassModifier<T>) =>
  [type, classModifier ?? '', refetch ? WITH_ACTION_CLASS_MODIFIER : ''].join(' ').trim();

type TsetClassName = {
  classAlertCt?: string;
  classContainerCt?: string;
  newClassModifier: string;
};

export const setClassName = ({ newClassModifier, classAlertCt = DEFAULT_CLASS_ALERT, classContainerCt = DEFAULT_CLASS_CONTAINER }: TsetClassName) =>
  newClassModifier === classContainerCt ? `${classContainerCt} ${classAlertCt}` : classAlertCt;

type TResilienceSubstitut<Trefetch> = {
  anomaly: Tanomaly;
  refetch?: Trefetch;
  children?: ReactNode;
  resilienceMode?: keyof typeof RESILIENCE_MODE;
  FallbackComponent?: ElementType;
  classModifier?: string;
  setClassModifierFn?: typeof setClassModifier;
  setClassNameFn?: typeof setClassName;
};

const ResilienceSubstitut = <Trefetch extends React.MouseEventHandler<HTMLButtonElement>>({
  anomaly,
  refetch,
  children,
  resilienceMode = RESILIENCE_MODE.alert,
  FallbackComponent = emptyFunction,
  classModifier = '',
  setClassModifierFn = setClassModifier,
  setClassNameFn = setClassName,
}: TResilienceSubstitut<Trefetch>) => {
  const { label, detail = '', type = 'error', iconName = 'exclamation-sign' } = anomaly;
  const newClassModifier = setClassModifierFn?.<Trefetch>({ type, classModifier, refetch });
  const className = setClassNameFn?.({ newClassModifier });

  return {
    [RESILIENCE_MODE.alert]: (
      <>
        <Alert className={className} title={label} icon={iconName} classModifier={newClassModifier}>
          {detail && <p>{detail}</p>}
          {children}
        </Alert>
        {refetch && (
          <ArticleRestitution classModifier={WITH_ACTION_CLASS_MODIFIER}>
            <SectionRestitution>
              <SectionRestitutionRow>
                <Button aria-label="Réessayer" type="button" classModifier="hasiconRight" onClick={refetch}>
                  <span className="af-link__text">Réessayer</span>
                  <i className="glyphicon glyphicon-refresh" />
                </Button>
              </SectionRestitutionRow>
            </SectionRestitution>
          </ArticleRestitution>
        )}
      </>
    ),
    [RESILIENCE_MODE.none]: null,
    [RESILIENCE_MODE.fallback]: <FallbackComponent />,
  }[resilienceMode];
};

export default ResilienceSubstitut;
