import { type QueryKey } from '@tanstack/react-query';
import { defaultQueryWithAuth, setQuery, setQueryClient, showReactQueryDevtools } from '../QueryProvider';

describe('defaultQueryWithAuth', () => {
  it('Should call fetchCustom with querykey when defaultQueryWithAuthFn have been called with fetchcustom and querykey', async () => {
    const fetchCustom = vi.fn();
    defaultQueryWithAuth('queryKey' as unknown as QueryKey, fetchCustom);
    expect(fetchCustom).toHaveBeenCalledWith('queryKey');
  });
});

describe('setQuery', () => {
  it('Should call setQueryFn with fetchcustom and querykey when defaultQueryWithAuthFn have been called with fetchcustom and querykey', async () => {
    const fetchCustom = vi.fn();
    const defaultQueryWithAuthFn = vi.fn();
    setQuery(fetchCustom)({ queryKey: 'queryKey' as unknown as QueryKey, defaultQueryWithAuthFn });

    expect(defaultQueryWithAuthFn).toHaveBeenCalledWith('queryKey', fetchCustom);
  });
  it('Should return when setQueryClient have been called with fetchcustom', async () => {
    const fetchCustom = vi.fn();
    const result = setQuery(fetchCustom)({ queryKey: 'queryKey' as unknown as QueryKey });

    expect(result).toEqual(Promise.resolve({}));
  });
});

describe('setQueryClient', () => {
  it('Should call setQueryFn with fetch custom when setQueryClient have been called with fetchcustom', async () => {
    const fetchCustom = vi.fn();
    const setQueryFn = vi.fn();
    setQueryClient({ fetchCustom, setQueryFn });

    expect(setQueryFn).toHaveBeenCalledWith(fetchCustom);
  });
});

describe('showReactQueryDevtools', () => {
  it('Should not return ReactQueryDevTools', () => {
    const process = 'test';
    const result = showReactQueryDevtools(process);
    expect(result).toEqual(false);
  });

  it('Should return ReactQueryDevTools', () => {
    const process = 'development';
    const result = showReactQueryDevtools(process);
    expect(result).not.toEqual(false);
  });
});
