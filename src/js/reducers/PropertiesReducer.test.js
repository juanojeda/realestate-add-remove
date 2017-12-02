import PropertiesReducer from './PropertiesReducer';
import * as ActionsTypes from '../actions/PropertiesActions';

import assign from 'lodash/assign';

import mockReceivedData from '../../data/properties.json';

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

describe('Properties Reducer', () => {

  it('should return the initial state', () => {
    expect(PropertiesReducer(undefined, {})).toEqual({
      results: [],
      saved: []
    });
  });

  it('should handle receiving fetched properties', () => {

    // on a fresh reducer
    expect(PropertiesReducer({}, {
      type: ActionsTypes.RECEIVE_PROPERTIES,
      propertiesData: mockReceivedData
    })).toEqual(mockReceivedData);

    // on a populated reducer
    expect(PropertiesReducer(
      {
        results: ['test 1', 'test 2'],
        saved: ['test1', 'test2']
      },
      {
        type: ActionsTypes.RECEIVE_PROPERTIES,
        propertiesData: mockReceivedData
      }
    )).toEqual(mockReceivedData);
  });

  it('should handle adding properties', () => {

    // can add to an empty array of saved properties
    expect(PropertiesReducer(
      {
        results: [],
        saved: []
      },
      {
        type: ActionsTypes.ADD_PROPERTY,
        property: mockProperty
      })
    ).toEqual({
      results: [],
      saved: [assign({},{...mockProperty}, {isSaved: true})]
    });

    // can handle duplicates by not adding them
    expect(PropertiesReducer(
      {
        results: [],
        saved: [mockProperty]
      },
      {
        type: ActionsTypes.ADD_PROPERTY,
        property: mockProperty
      })
    ).toEqual({
      results: [],
      saved: [mockProperty]
    });
  });

  it('should handle removing properties', () => {

    // can add to an empty array of saved properties
    expect(PropertiesReducer(
      {
        results: [],
        saved: [mockProperty]
      },
      {
        type: ActionsTypes.REMOVE_PROPERTY,
        property: mockProperty
      })
    ).toEqual({
      results: [],
      saved: []
    });
  });
});
