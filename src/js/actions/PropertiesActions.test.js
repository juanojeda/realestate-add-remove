import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchMock from 'fetch-mock';

import * as PropertiesActions from './PropertiesActions';
import mockData from '../../data/properties.json';

/* eslint-disable quotes */
const mockProperty = {
  "price": "$726,500",
  "agency": {
    "brandingColors": {
      "primary": "#ffe512"
    },
    "logo": "http://i1.au.reastatic.net/agencylogo/XRWXMT/12/20120927204448.gif"
  },
  "id": "1",
  "mainImage": "http://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg"
};/* eslint-enable quotes */

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('PropertiesActions', () => {

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates the right actions once the properties have been fetched', () => {

    fetchMock.getOnce(PropertiesActions.PROPERTIES_API, mockData);

    const propertiesData = mockData;
    const expectedActions = [
      { type: PropertiesActions.REQUEST_FETCH_PROPERTIES },
      {
        propertiesData,
        type: PropertiesActions.RECEIVE_PROPERTIES
      }
    ];
    const store = mockStore({
      results: [],
      saved: []
    });

    return store.dispatch(PropertiesActions.fetchProperties()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates the ADD_PROPERTY action when the addProperty action is dispatched', () => {

    const expectedAction = {
      type: PropertiesActions.ADD_PROPERTY,
      property: mockProperty
    };

    expect(PropertiesActions.addProperty(mockProperty)).toEqual(expectedAction);

  });

  it('creates the REMOVE_PROPERTY action when the removeProperty action is dispatched', () => {

    const expectedAction = {
      type: PropertiesActions.REMOVE_PROPERTY,
      property: mockProperty
    };

    expect(PropertiesActions.removeProperty(mockProperty)).toEqual(expectedAction);

  });

});
