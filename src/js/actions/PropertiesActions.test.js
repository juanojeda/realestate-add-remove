import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchMock from 'fetch-mock';

import * as PropertiesActions from './PropertiesActions';
import mockData from '../../data/properties.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('PropertiesActions', () => {

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create an action to receive fetched properties data', () => {
    const propertiesData = mockData;
    const expectedAction = {
      propertiesData,
      type: PropertiesActions.RECEIVE_PROPERTIES
    };

    expect(PropertiesActions.receiveFetchedProperties(propertiesData)).toEqual(expectedAction);
  });

  it('should creates RECEIVE_PROPERTIES once the properties have been fetched', () => {

    fetchMock.getOnce(PropertiesActions.PROPERTIES_API, mockData);

    const propertiesData = mockData;
    const expectedActions = [
      {type: PropertiesActions.REQUEST_FETCH_PROPERTIES},
      {
      propertiesData,
      type: PropertiesActions.RECEIVE_PROPERTIES
    }];
    const store = mockStore({
      results: [],
      saved: []
    })

    return store.dispatch(PropertiesActions.fetchProperties()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

});
