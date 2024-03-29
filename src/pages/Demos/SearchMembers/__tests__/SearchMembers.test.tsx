import { screen } from '@testing-library/react';
import { MODES } from 'shared/components/Loader';
import { emptyFunction, render } from 'shared/testsUtils';
import SearchMembers, { DownloadLinkEnhanced, getDownloadPath, setFileName } from '../SearchMembers';

describe('getDownloadPath', () => {
  it('Should return "members/0064962455/download-detail" When getDownloadPath with memberId "0064962455"', () => {
    const result = getDownloadPath('0064962455');
    const expected = 'members/0064962455/download-detail';
    expect(result).toEqual(expected);
  });
});

describe('setFileName', () => {
  it('Should return prefix___20180922.csv When setFileName with date (2018, 8, 22)', () => {
    const result = setFileName({ date: `${new Date(2018, 8, 22)}` });
    const expected = 'prefix___20180922.csv';
    expect(result).toEqual(expected);
  });

  it('Should return prefix___20180922.csv When setFileName with date (2018, 8, 22)', () => {
    const result = setFileName({ name: 'name', memberId: '0123456789', date: `${new Date(2018, 8, 22)}` });
    const expected = 'prefix_name_0123456789_20180922.csv';
    expect(result).toEqual(expected);
  });

  it('Should return prefix___20180922.csv When setFileName with formatDateFn return 20180922', () => {
    const formatDateFnMock = vi.fn().mockReturnValue('20180922');
    const result = setFileName({ name: 'name', memberId: '0123456789', formatDateFn: formatDateFnMock });
    const expected = 'prefix_name_0123456789_20180922.csv';
    expect(result).toEqual(expected);
  });
});

describe('<DownloadLinkEnhanced />', () => {
  const setFileNameFnMock = vi.fn();
  const getDownloadPathFnMock = vi.fn();
  const defaultDownloadProps = {
    idKey: '09878817',
    firstname: 'samuel',
    lastname: 'gomez',
  };

  it('Should call getDownloadPathFn and setFileNameFn with proper params', () => {
    render(<DownloadLinkEnhanced {...defaultDownloadProps} getDownloadPathFn={getDownloadPathFnMock} setFileNameFn={setFileNameFnMock} />);
    expect(getDownloadPathFnMock).toHaveBeenCalledWith('09878817');
    expect(setFileNameFnMock).toHaveBeenCalledWith({ memberId: '09878817', name: 'samuel-gomez' });
  });
});

const defaultProps = {
  members: [],
  anomaly: null,
  loaderMode: MODES.none,
  submitFormSearchMembers: emptyFunction,
};

describe('<SearchMembers/>', () => {
  it('Should render <SearchMembers /> with one member', () => {
    render(
      <SearchMembers
        {...defaultProps}
        searchMembers={[
          {
            key: '1',
            cols: {
              firstname: {
                label: 'nom du membre',
              },
              lastname: {
                label: 'nom du membre',
              },
              _id: {
                label: '1254689759',
              },
              actions: {
                children: <p>hello</p>,
                classModifier: 'actions',
              },
            },
          },
        ]}
      />,
    );
    const hello = screen.getByText('hello');
    expect(hello).toBeInTheDocument();
    expect(hello.closest('td')).toHaveClass('af-table__cell--actions');
  });
});
