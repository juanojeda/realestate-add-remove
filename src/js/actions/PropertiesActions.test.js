import * as PropertiesActions from './PropertiesActions';

const mockPropertyData = {
  results: [
    'test'
  ],
  saved: [
    'test'
  ]
};

describe('PropertiesActions', () => {
  it('should create an action to receive fetched properties data', () => {
    const propertiesData = mockPropertyData;
    const expectedAction = {
      propertiesData,
      action: PropertiesActions.RECEIVE_PROPERTIES
    };

    expect(PropertiesActions.receiveFetchedProperties(propertiesData)).toEqual(expectedAction);
  });

});
