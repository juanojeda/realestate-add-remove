export const REQUEST_FETCH_PROPERTIES = 'REQUEST_FETCH_PROPERTIES';
export const RECEIVE_PROPERTIES       = 'RECEIVE_PROPERTIES';
export const ADD_PROPERTY             = 'ADD_PROPERTY';
export const REMOVE_PROPERTY          = 'REMOVE_PROPERTY';

// action for requesting fetch

// action for receiving fetched properties
export const receiveFetchedProperties = propertiesData => ({
  propertiesData,
  action: RECEIVE_PROPERTIES
});

// action for adding properties to saved property store

// action for removing properties to saved property store
