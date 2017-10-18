import React, { Component } from 'react';
import NameField from './Form/NameField';

const defaultField = {
  value: "init",
  error: null
}

class AccountForm extends Component {
  constructor() {
    super()

    this.state = {
      firstName: defaultField,
      lastName: defaultField
    }

    this.setValueOrError = this.setValueOrError.bind(this)
    this.setFirstName = this.setFirstName.bind(this)
    this.setLastName = this.setLastName.bind(this)
    this.submit = this.submit.bind(this)
  }

  static nameValidation = name =>
    /[^A-Z]/i.test(name) ?
      "Name can only contain upper and lowercase letters" :
      false

  static requiredField = val =>
    val.length === 0 ?
      "This field is required" :
      false


  setValueOrError(name, field) {
      this.setState({
        [field]: {
          value: name,
          error: AccountForm.requiredField(name) || AccountForm.nameValidation(name)
        }
      })
  }

  setFirstName(event) {
    return this.setValueOrError(event.target.value, 'firstName')
  }

  setLastName(event) {
    return this.setValueOrError(event.target.value, 'lastName')
  }

  submit() {
  }

  render() {
    return (
      <form>
        <legend>Create your free account</legend>
        <fieldset>
          <NameField
            type="firstname"
            value={this.state.firstName.value}
            error={this.state.firstName.error}
            onChange={this.setFirstName}
            />
          <NameField
            type="lastname"
            value={this.state.lastName.value}
            error={this.state.lastName.error}
            onChange={this.setLastName}
            />
            <input type="submit" value="SUBMIT" onPress={this.submit} />
        </fieldset>
      </form>
    );
  }
}

export default AccountForm;
