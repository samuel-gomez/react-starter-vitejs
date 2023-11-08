import { render, screen } from '@testing-library/react';
import Loader from '../Loader';

describe('<LoaderContainer />', () => {
  it.each`
    classModifier   | mode        | message         | expectedMessage                                 | expectedClass
    ${undefined}    | ${'none'}   | ${undefined}    | ${''}                                           | ${'af-loader'}
    ${undefined}    | ${'get'}    | ${undefined}    | ${'Chargement en cours'}                        | ${'af-loader'}
    ${undefined}    | ${'post'}   | ${undefined}    | ${'Sauvegarde en cours'}                        | ${'af-loader'}
    ${undefined}    | ${'delete'} | ${undefined}    | ${'Suppression en cours'}                       | ${'af-loader'}
    ${undefined}    | ${'update'} | ${undefined}    | ${'Mise à jour en cours'}                       | ${'af-loader'}
    ${undefined}    | ${'error'}  | ${undefined}    | ${'Une erreur est survenue lors du chargement'} | ${'af-loader'}
    ${'fullscreen'} | ${'get'}    | ${undefined}    | ${'Chargement en cours'}                        | ${'af-loader--fullscreen'}
    ${'skeleton'}   | ${'get'}    | ${undefined}    | ${'Chargement en cours'}                        | ${'af-loader--skeleton'}
    ${undefined}    | ${'get'}    | ${'my message'} | ${'my message'}                                 | ${'af-loader'}
  `(
    'Should render view with expectedClass: $expectedClass, expectedMessage: $expectedMessage when classModifier: $classModifier, message: $message, mode: $mode',
    ({ expectedClass, expectedMessage, mode, ...rest }) => {
      render(
        <Loader mode={mode} {...rest}>
          <p>child component</p>
        </Loader>,
      );
      if (mode === 'none') {
        expect(screen.getByText('child component')).toBeInTheDocument();
      } else {
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByLabelText(expectedMessage));
      }
    },
  );
});
