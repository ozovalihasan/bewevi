import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import EmptyImage from './EmptyImage';

describe('<EmptyImage />', () => {
  it('renders an image', () => {
    const renderedComponent = renderer.create(
      <EmptyImage className="empty-image" />,
    ).toJSON();
    expect(renderedComponent.props.className).toEqual('empty-image');
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <EmptyImage
        className="empty-image"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
