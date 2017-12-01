import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Property extends Component {
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
        <div className="property__header" style={{background: agency.brandingColors.primary}}>
          <img src={agency.logo} alt=""/>
        </div>
        <div className="property__image-container">
          <img className="property__image" src={mainImage} alt="test"/>
        </div>
        <div className="property__price-container">Price: <span className="property__price">{price}</span></div>
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

Property.defaultProps = {
  isSaved:          false,
  price:            '$1',
  id:               '0',
  mainImage:        '//placehold.it/300x300',
  agency:           {
    brandingColors: {
      primary:      '#444',
    },
    logo:           '//placehold.it/100x60',
  }
};

const mapStateToProps = (state) => {
  return {
    savedProperties: state.PropertiesReducer.saved
  };
};

export default connect(mapStateToProps)(Property);
