import React, { Component } from 'react';

import Header from '../../components/header';
import Property from '../../components/property';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="property-selector">
          <div className="property-selector__list">
            <div className="property-selector__list-header">
              <h3>Results</h3>
            </div>
            <Property />
            <Property />
            <Property />
          </div>

          <div className="property-selector__list">
            <h3>Saved Properties</h3>
            <Property isSaved={true} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
