import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Property extends Component {
  render() {
    return (
      <div>

      </div>
    );
  }
}

Property.propTypes = {
  isSaved:          PropTypes.bool.isRequired,
  price:            PropTypes.string.isRequired,
  id:               PropTypes.string.isRequired,
  mainImage:        PropTypes.string.isRequired,
  agency:           PropTypes.shape({
    brandingColors: PropTypes.shape({
      primary:      PropTypes.string.isRequired,
    }),
    logo:           PropTypes.string.isRequired,
  })
};

export default Property;
