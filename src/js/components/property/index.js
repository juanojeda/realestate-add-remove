import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Property extends Component {
  render() {
    const {
      isSaved,
      price,
      id,
      mainImage,
      agency } = this.props;
    const buttonClasses = `property__cta property__cta--${isSaved ? 'remove' : 'add'}`;

    return (
      <div className="property">
        <div className="property__header">
          <img src="//placehold.it/100x20" alt=""/>
        </div>
        <div className="property__image-container">
          <img className="property__image" src="//placehold.it/300x300" alt="test"/>
        </div>
        <div className="property__details">Price: $20,000</div>
        <div className="property__cta-container">
          <button className={buttonClasses}>
            {
              isSaved ? 'Remove' : 'Add'
            }
          </button>
        </div>
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
