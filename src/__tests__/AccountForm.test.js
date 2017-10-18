import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AccountForm from '../AccountForm';
import FormField from '../FormField';

const emptyFieldMessage = "This field is required"
const badNameMessage = "Name may only contain upper and lowercase letters"

const errorMessages = [
  "Name may only contain upper and lowercase characters",
  "Username can only contain lowercase letters, underscores, and periods",
  "Password must be longer than 8 characters",
  "Must be a valid email address"
]

const brokenState = {
  firstName: { value: "." },
  lastName: { value: "$" },
  username: { value: "UP" },
  password: { value: "short" },
  email: { value: "lewis!@.gong.bong." }
}

configure({ adapter: new Adapter() });

describe('<AccountForm />', () => {

  it('setting field values alters AccountForm state', () => {
    const wrapper = mount(<AccountForm />)
    const input = wrapper.find('#firstName > input')
    const newValue = "hello"

    input.simulate('change', {target: {value: newValue}})

    wrapper.update()

    expect(wrapper.state('firstName').value).toEqual(newValue)
  })

  it('empty fields display appropriate message on submit', () => {
    const wrapper = mount(<AccountForm />)
    wrapper.find('#account-form-submit').simulate('click')
    wrapper.update()

    wrapper.find('FormField span')
      .map(err => expect(err.text()).toEqual(emptyFieldMessage))
  })

  it('fields display errors on typing malformed input', () => {
    const wrapper = mount(<AccountForm />)

    wrapper.find('FormField')
      .map(formField => {
        const type = formField.find('div').prop('id')

        return formField.find('input')
          .simulate('change', { target: { value: brokenState[type].value }})
      })

    wrapper.update()

    wrapper.find('FormField span')
      .map(errNode => errNode.text())
      .map(err => expect(errorMessages).toContain(err))
  })

  it('fields display errors on submit with malformed state', () => {
    const wrapper = mount(<AccountForm />)

    wrapper.setState(brokenState)
    wrapper.find('#account-form-submit').simulate('click')

    wrapper.find('FormField span')
      .map(errNode => errNode.text())
      .map(err => expect(errorMessages).toContain(err))
  })
});
