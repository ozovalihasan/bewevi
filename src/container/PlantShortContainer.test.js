import { render, screen } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import PlantShortContainer from './PlantShortContainer';

// const useDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => (jest.fn().mockImplementation(action => action)),
}));

jest.mock('../component/PlantShort');

jest.mock('../redux', () => ({
  fetchSelectedPlant: plantId => plantId()
  ,
}));

const mockTest = jest.fn().mockReturnValue(() => 'hasan');

const plant = { id: mockTest };

describe('<PlantShortContainer />', () => {
  it('is triggering handleError if there is an error related to img tag', () => {
    render(
      <PlantShortContainer plant={plant} />,
    );
    ReactTestUtils.Simulate.error(screen.getByAltText('test'));
    expect(screen.getByAltText('test').src).toEqual('http://localhost/emptyImage.svg');
  });

  it('is triggering handleClick when the button is clicked', () => {
    render(
      <PlantShortContainer plant={plant} />,
    );
    expect(mockTest.mock.calls.length).toEqual(0);
    ReactTestUtils.Simulate.click(screen.getByText('test'));
    expect(mockTest.mock.calls.length).toEqual(1);
  });

  it('renders correctly', () => {
    const renderedContainer = render(
      <PlantShortContainer plant={plant} />,
    );
    expect(renderedContainer).toMatchSnapshot();
  });
});
