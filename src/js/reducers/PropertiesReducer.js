import assign from 'lodash/assign';
import uniqBy from 'lodash/uniqBy';
import filter from 'lodash/filter';

import * as Actions from '../actions/PropertiesActions';

const initialState = {
  results: [],
  saved: []
};

const PropertiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.RECEIVE_PROPERTIES: {
      const newState = action.propertiesData;
      const newSaved = newState.saved.map((property) => {
        property.isSaved = true;
        return property;
      });
      const newResults = newState.results.map((property) => {
        property.isSaved = false;
        return property;
      });

      return {
        saved: newSaved,
        results: newResults
      };
    }

    case Actions.ADD_PROPERTY: {
      const addedProperty = assign({}, {...action.property}, {
        isSaved: true,
      });
      const newSavedProperties = uniqBy([...state.saved, addedProperty], 'id');
      const newState = assign({}, state, {
        saved: newSavedProperties
      });

      return newState;
    }

    case Actions.REMOVE_PROPERTY: {
      const newSavedProperties = filter(state.saved, (property) => {
        return property.id !== action.property.id
      });
      const newState = assign({}, state, {
        saved: newSavedProperties
      });

      return newState;

    }

    default: {
      return state;
    }
  }
};

export default PropertiesReducer;
