import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AccountForm.css'

class FormField extends Component {
  render() {
    return (
      <div className="field-wrapper" id={this.props.type}>
        <p className="field-title">{this.props.title}</p>
        <input
          className={`form-field ${this.props.error && "failed-input"}`}
          value={this.props.value}
          onChange={this.props.onChange}
          type="text"
        />
        {this.props.error && <span className="field-error">{this.props.error}</span>}
      </div>
    );
  }
}

FormField.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  onChange: PropTypes.func
}

export default FormField;
