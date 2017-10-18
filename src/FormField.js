import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormField extends Component {
  render() {
    return (
      <div id={this.props.type}>
        <input
          value={this.props.value}
          onChange={this.props.onChange}
          type="text"
        />
        {this.props.error && <span>{this.props.error}</span>}
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
