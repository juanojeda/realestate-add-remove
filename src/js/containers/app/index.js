import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import assign from 'lodash/assign';

import * as PropertiesActions from '../../actions/PropertiesActions';

import Header from '../../components/header';
import Property from '../../components/property';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentWillMount() {
    const { actions } = this.props;

    actions.fetchProperties()
      .then(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading } = this.state;
    const { allProperties, saved } = this.props;

    return (
      <div>
        <Header />
        {
          isLoading ?
          <div className="loader">
            <div className="loader__spinner"></div>
          </div>
          :
          <div className="property-selector">
            <div className="property-selector__list">
              <div className="property-selector__list-header">
                <h3>Results</h3>
              </div>
              {
                allProperties.map((property) => {
                  return <Property key={property.id} {... property} />;
                })
              }
            </div>

            <div className="property-selector__list">
              <h3>Saved Properties</h3>

              {
                saved.map((property) => {
                  return <Property isSaved={true} key={property.id} {... property} />;
                })
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { results: allProperties, saved } = state.PropertiesReducer;

  return {
    allProperties,
    saved
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(assign({}, PropertiesActions), dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
