import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import sinon from 'sinon';
import AccountForm from '../AccountForm';
import NameField from '../Form/NameField';

const emptyFieldMessage = "This field is required"
const badNameMessage = "Name can only contain upper and lowercase letters"

configure({ adapter: new Adapter() });

describe('<AccountForm />', () => {

  it('renders each field properly', () => {
    const wrapper = shallow(<AccountForm />)
    expect(wrapper.find(NameField)).toHaveLength(2)
  });

  it('setting field values alters AccountForm state', () => {
    const wrapper = mount(<AccountForm />)
    const input = wrapper.find('#firstname > input')
    const newValue = "hello"

    input.simulate('change', {target: {value: newValue}})

    wrapper.update()

    expect(wrapper.state('firstName').value).toEqual(newValue)
  })

  it('empty fields have appropriate errors', () => {
    const wrapper = mount(<AccountForm />)
    const input = wrapper.find('#firstname > input')

    input.simulate('change', {target: { value: '' } })
    wrapper.update()

    expect(wrapper.state('firstName').error).toEqual(emptyFieldMessage)
    expect(wrapper.find('#firstname > span').text()).toEqual(emptyFieldMessage)
  })

  it('name fields have errors on malformed input', () => {
    const wrapper = mount(<AccountForm />)
    const input = wrapper.find('#firstname > input')

    input.simulate('change', {target: { value: 'hello world' } })
    wrapper.update()

    expect(wrapper.state('firstName').error).toEqual(badNameMessage)
    expect(wrapper.find('#firstname > span').text()).toEqual(badNameMessage)
  })
});
