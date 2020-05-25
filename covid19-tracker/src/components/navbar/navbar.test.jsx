import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Navbar from './Navbar';

configure({ adapter: new Adapter() });

describe(`<Navbar/>`, () => {
  it(`should contain two Links`, () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find(Link)).toHaveLength(2);
  });
});
