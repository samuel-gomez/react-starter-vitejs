import type { FetchContextType } from 'App/FetchProvider';
import { ALERT_TYPE } from 'App/NotificationProvider';
import { fetchCustomAddMember, mutation, onSuccess, setTypeNotification } from '../MembersNew.hook';

describe('fetchCustomAddMember', () => {
  const fetchCustom = vi.fn().mockResolvedValue({});
  const fetchContextFn = {
    fetchCustom,
  } as unknown as FetchContextType;
  it('Should call fetchContextFn with expected values when fetchCustomAddMember have been called', async () => {
    const data = { firstname: 'sam', lastname: 'gomez' };
    await fetchCustomAddMember({ data, fetchContextFn });
    expect(fetchCustom).toHaveBeenCalledWith([
      'members/add',
      {
        body: JSON.stringify(data),
        method: 'POST',
      },
    ]);
  });
});

describe('mutation', () => {
  const fetchCustomAddMemberFn = vi.fn();
  const fetchCustom = vi.fn().mockResolvedValue({});
  const fetchContextFn = {
    fetchCustom,
  } as unknown as FetchContextType;
  it('Should call fetchCustomAddMemberFn with expected values when mutation have been called', async () => {
    const data = { firstname: 'sam', lastname: 'gomez' };

    const fetchMutation = mutation({ fetchContextFn, fetchCustomAddMemberFn });
    await fetchMutation(data);
    expect(fetchCustomAddMemberFn).toHaveBeenCalledWith({ data, fetchContextFn });
  });
});

describe('onSuccess', () => {
  const reset = vi.fn();
  const addNotification = vi.fn();

  it('Should call addNotification with expected values and reset function when onSuccess have been called', async () => {
    const data = {
      responseBody: { firstname: 'sam', lastname: 'gomez', id: '123' },
    };

    const fetchOnSuccess = onSuccess({ addNotification, reset });
    fetchOnSuccess(data);
    expect(addNotification).toHaveBeenCalledWith({
      id: 'addmember-123',
      label: `Membre sam gomez ajouté avec succès`,
      type: 'success',
    });
  });
});

describe('setTypeNotification', () => {
  it('Should return empty object when setTypeNotification have been called with code 500', async () => {
    const type = setTypeNotification({ code: 500 });
    expect(type).toEqual({});
  });
  it('Should return empty object when setTypeNotification have been called with code 404', async () => {
    const type = setTypeNotification({ code: 404 });
    expect(type).toEqual({
      type: `${ALERT_TYPE.danger}`,
    });
  });
});
