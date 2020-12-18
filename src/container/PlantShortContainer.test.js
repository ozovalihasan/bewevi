import { render, screen } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import PlantShortContainer from './PlantShortContainer';

const mockStore = configureStore();
const store = mockStore();
store.dispatch = jest.fn();

jest.mock('../component/PlantShort');

const plant = { id: 1993 };

let renderReadyComponent;

beforeEach(() => {
  renderReadyComponent = (
    <Provider store={store}>
      <BrowserRouter>
        <PlantShortContainer plant={plant} />
      </BrowserRouter>
    </Provider>
  );
});

describe('<PlantShortContainer />', () => {
  it('is triggering handleClick and redirect the user to the linked page when the button is clicked ', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PlantShortContainer plant={plant} />
          <Redirect to="/" />
          <Switch>
            <Route exact path="/" render={() => <>Main Page</>} />
            <Route exact path="/one-plant" render={() => <div>One Plant Page</div>} />
          </Switch>
        </BrowserRouter>
      </Provider>,
    );
    expect(store.dispatch).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByText(/test/i));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/One Plant Page/i)).toBeInTheDocument();
  });

  it('is triggering handleError if there is an error related to img tag', () => {
    render(renderReadyComponent);
    ReactTestUtils.Simulate.error(screen.getByAltText('test'));
    expect(screen.getByAltText('test').src).toEqual('http://localhost/emptyImage.svg');
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent);
    expect(renderedContainer).toMatchSnapshot();
  });
});
