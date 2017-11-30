import 'whatwg-fetch';

export const REQUEST_FETCH_PROPERTIES = 'REQUEST_FETCH_PROPERTIES';
export const RECEIVE_PROPERTIES       = 'RECEIVE_PROPERTIES';
export const ADD_PROPERTY             = 'ADD_PROPERTY';
export const REMOVE_PROPERTY          = 'REMOVE_PROPERTY';
export const PROPERTIES_API = '/data/properties.json';

export const requestFetchProperties = () => ({
  type: REQUEST_FETCH_PROPERTIES
});


// action for requesting fetch
export const fetchProperties = () => dispatch => {
  dispatch(requestFetchProperties());

  const propertiesPromise = fetch(PROPERTIES_API)
    .then(response => response.json())
    .then(json => {
      dispatch(receiveFetchedProperties(json));
    })
    .catch(error => {
      throw(error);
    });

  return propertiesPromise;

}

// action for receiving fetched properties
export const receiveFetchedProperties = propertiesData => ({
  propertiesData,
  type: RECEIVE_PROPERTIES
});

// action for adding properties to saved property store
export const addProperty = property => ({
  property,
  type: ADD_PROPERTY
});

// action for removing properties to saved property store
export const removeProperty = property => ({
  property,
  type: REMOVE_PROPERTY
});
