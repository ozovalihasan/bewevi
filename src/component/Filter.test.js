import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import Filter from './Filter';

const handleChangeCategory = jest.fn();
const handleFilterName = jest.fn();
let category = 'Filter By Category';
const filterName = 'Filter Name';
const categoryNameList = [
  ['Habitat', 'pokemon-habitat/'],
  ['Shape', 'pokemon-shape/'],
];
const categoryList = ['cave', 'forest'];
const renderReadyComponent = (
  <Filter
    handleChangeCategory={handleChangeCategory}
    handleFilterName={handleFilterName}
    category={category}
    filterName={filterName}
    categoryNameList={categoryNameList}
    categoryList={categoryList}
  />
);

describe('<Filter />', () => {
  describe('If category is \'Filter By Category\'', () => {
    it('renders category list, not filter name options ', () => {
      render(
        renderReadyComponent,
      );
      expect(screen.getByText(/Habitat/i)).toBeInTheDocument();
      expect(screen.getByText(/Shape/i)).toBeInTheDocument();
      expect(screen.getAllByText(/All/i).length).toEqual(1);
      expect(screen.queryByText(/Cave/i)).not.toBeInTheDocument();
    });

    it('renders correctly', () => {
      const tree = renderer.create(
        renderReadyComponent,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('If category is not \'Filter By Category\' or \'All\'', () => {
    it('renders category list, filter name options if category is not \'Filter By Category\' or \'All\'', () => {
      category = 'Shape';
      render(
        <Filter
          handleChangeCategory={handleChangeCategory}
          handleFilterName={handleFilterName}
          category={category}
          filterName={filterName}
          categoryNameList={categoryNameList}
          categoryList={categoryList}
        />,
      );
      expect(screen.getByText(/Habitat/i)).toBeInTheDocument();
      expect(screen.getByText(/Shape/i)).toBeInTheDocument();
      expect(screen.getAllByText(/All/i).length).toEqual(2);
      expect(screen.getByText(/Cave/i)).toBeInTheDocument();
    });

    it('renders correctly', () => {
      const tree = renderer.create(
        renderReadyComponent,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
