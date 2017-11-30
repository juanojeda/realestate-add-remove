import React, { Component } from 'react';

import Header from '../../components/header';
import Property from '../../components/property';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Property />
      </div>
    );
  }
}

export default App;
