import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';

import Logo from './Logo';

describe('<Logo />', () => {
  it('links to root page', () => {
    render(
      <BrowserRouter>
        <Logo />
        <Redirect to="/second-page" />
        <Switch>
          <Route exact path="/" render={() => <div>Root page</div>} />
          <Route exact path="/second-page" render={() => <div>Second Page</div>} />
        </Switch>
      </BrowserRouter>,
    );
    expect(screen.getByText(/Second Page/i)).toBeInTheDocument();
    expect(screen.getByText(/Ivy/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Ivy/i));
    expect(screen.getByText(/Root Page/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
