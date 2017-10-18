import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NameField extends Component {
  render() {
    return (
      <div>
        <input
          value={this.props.value}
          onChange={this.props.onChange}
          type="text"
          id={this.props.type}
        />
        {this.props.error && <span>{this.props.error}</span>}
      </div>
    );
  }
}

  NameField.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func
  }

export default NameField;
