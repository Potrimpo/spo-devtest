import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import sinon from 'sinon';
import AccountForm from '../AccountForm';
import NameField from '../Form/NameField';

configure({ adapter: new Adapter() });

describe('<AccountForm />', () => {

  it('renders each field properly', () => {
    const wrapper = shallow(<AccountForm />)
    expect(wrapper.find(NameField)).toHaveLength(2)
  });

  it('deep testing of name field behaviour', () => {
    const wrapper = mount(<AccountForm />)
    const input = wrapper.find('#firstname')
    const newValue = "hello"

    input.simulate('change', {target: {value: newValue}})

    wrapper.update()

    expect(wrapper.state('firstName').value).toEqual(newValue)
  })
});
