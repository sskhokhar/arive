import React from 'react';
import { mount } from 'enzyme';
import HobbyItem from '../../components/hobby/hobby';

describe('<HobbyItem />', () => {
  let component: any;
  let clickFn = jest.fn();
  beforeAll(() => {
    component = mount(<HobbyItem onDelete={clickFn} />);
  });
  it('should render the item', () => {
    expect(component.html()).toMatchSnapshot();
  });
  it('should calls the onClick prop function when clicked', () => {
    expect(clickFn).not.toHaveBeenCalled();
    component.find('button').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
