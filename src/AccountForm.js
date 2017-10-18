import React, { Component } from 'react';
import FormField from './FormField';

const defaultField = {
  value: "",
  error: null
}

class AccountForm extends Component {
  constructor() {
    super()

    this.state = {
      firstName: defaultField,
      lastName: defaultField,
      username: defaultField,
      password: defaultField,
      email: defaultField
    }

    this.setValueOrError = this.setValueOrError.bind(this)
    this.setFirstName = this.setFirstName.bind(this)
    this.setLastName = this.setLastName.bind(this)
    this.setUsername = this.setUsername.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.submit = this.submit.bind(this)
  }


  static requiredField = val =>
    val.length === 0 ?
      "This field is required" :
      false

  static nameValidation = name =>
    /[^A-Z]/i.test(name) ?
      "Name may only contain upper and lowercase characters" :
      false

  static usernameValidation = username =>
    /[^a-z_.]/.test(username) ?
      "Username can only contain lowercase letters, underscores, and periods" :
      false

  static passwordValidation = passw =>
    passw.length < 8 ?
      "Password must be longer than 8 characters" :
      false

  static emailValidation = email =>
    // this is nightmarish
    /[a-z0-9_.!#$%&'*+-/=?^_`{|}~]+[a-z0-9_!#$%&'*+-/=?^_`{|}~]@[a-z]+[a-z-.]*[a-z]+/.test(email) ?
      false :
      "Must be a valid email address"

  static fieldValidation(val, field) {
    const fieldNotPresent = AccountForm.requiredField(val)
    if (fieldNotPresent) {
      return fieldNotPresent
    }

    switch (field) {
      case "firstName":
      case "lastName":
        return AccountForm.nameValidation(val)

      case "username":
        return  AccountForm.usernameValidation(val)

      case "password":
        return AccountForm.passwordValidation(val)

      case "email":
        return AccountForm.emailValidation(val)

      default:
        throw new Error("attempting to validate an unknown field")
    }
  }

  fullValidationSweep() {
    const errorList = []
    for (const field in this.state) {
      const hasError = AccountForm.fieldValidation(this.state[field].value, field)

      if (hasError) {
        // display the error for the user
        this.setValueOrError(this.state[field].value, field)
        errorList.push(hasError)
      }
    }

    return errorList
  }

  setValueOrError(name, field) {
      this.setState({
        [field]: {
          value: name,
          error: AccountForm.fieldValidation(name, field)
        }
      })
  }

  setFirstName(event) {
    return this.setValueOrError(event.target.value, 'firstName')
  }

  setLastName(event) {
    return this.setValueOrError(event.target.value, 'lastName')
  }

  setUsername(event) {
    return this.setValueOrError(event.target.value, 'username')
  }

  setPassword(event) {
    return this.setValueOrError(event.target.value, 'password')
  }

  setEmail(event) {
    return this.setValueOrError(event.target.value, 'email')
  }

  submit(e) {
    e.preventDefault()

    const errors = this.fullValidationSweep()

    if (errors.length === 0) {
      console.log("this is the winning path")
    } else {
      console.error("there is an incorrect field", errors)
    }
  }

  render() {
    return (
      <form>
        <legend>Create your free account</legend>
        <fieldset>
          <FormField
            type="firstName"
            value={this.state.firstName.value}
            error={this.state.firstName.error}
            onChange={this.setFirstName}
            />
          <FormField
            type="lastName"
            value={this.state.lastName.value}
            error={this.state.lastName.error}
            onChange={this.setLastName}
            />
          <FormField
            type="username"
            value={this.state.username.value}
            error={this.state.username.error}
            onChange={this.setUsername}
            />
          <FormField
            type="password"
            value={this.state.password.value}
            error={this.state.password.error}
            onChange={this.setPassword}
            />
          <FormField
            type="email"
            value={this.state.email.value}
            error={this.state.email.error}
            onChange={this.setEmail}
            />
            <button id="account-form-submit" type="submit" onClick={this.submit}>
              SUBMIT
            </button>
        </fieldset>
      </form>
    );
  }
}

export default AccountForm;
