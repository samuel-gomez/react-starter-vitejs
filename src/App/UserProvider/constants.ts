export const NON_CONNECTE = 'Non Connecté';

// Used when oidc configuration is disabled
const useOidcUserMock = () => ({
  oidcUser: {
    name: 'John Doe',
    given_name: 'John',
    family_name: 'Doe',
    email: 'john.doe@test.fr',
    email_verified: true,
    website: 'test.fr',
    sub: '2',
  },
});

export default useOidcUserMock;
