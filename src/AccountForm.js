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

    this.nameValidation = this.nameValidation.bind(this)
    this.setFirstName = this.setFirstName.bind(this)
    this.setLastName = this.setLastName.bind(this)
    this.submit = this.submit.bind(this)
  }


  nameValidation(name) {
    if (/\W/.test(name)) {
      this.setState(prevState => ({
        ...prevState,
        firstName: {
          ...prevState.firstName,
          error: "name can only contain upper and lowercase letters"
        }
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        firstName: {
          ...prevState.firstName,
          value: name
        }
      }))
    }
  }

  setFirstName(event) {
    return this.setState({
      firstName: {
        value: event.target.value
      }
    })
  }

  setLastName(event) {
    return this.setState({
      lastName: {
        value: event.target.value
      }
    })
  }

  submit() {
    console.log("submitting")
    // nameValidation()
  }

  render() {
    return (
      <form method="post">
        <legend>Create your free account</legend>
        <fieldset>
          <NameField
            value={this.state.firstName.value}
            error={this.state.firstName.error}
            onChange={this.setFirstName}
            type="firstname" />
          <NameField
            value={this.state.lastName.value}
            error={this.state.lastName.error}
            onChange={this.setLastName}
            type="lastname" />
            <input type="submit" value="SUBMIT" onPress={this.submit} />
        </fieldset>
      </form>
    );
  }
}

export default AccountForm;
