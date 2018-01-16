import * as types from "../actions/types";
const initialState = {
  data: [],
  position: 0,
  type: "",
  fetching: false,
  fetched: false,
  error: null
};

export function data(state = initialState, action) {
  data;
  switch (action.type) {
    case types.GET_REQUEST:
      return { ...state, fetching: true };
      break;

    case types.GET_SUCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        type: "",
        data: Object.assign([], state.data, action.data)
      };
      break;

    case types.GET_INITIAL:
      return {
        ...state,
        fetching: false,
        fetched: true,
        type: "",
        data: Object.assign(
          [],
          state.data,
          state.data.length > 0 ? state.data : action.data
        )
      };
      break;

    case types.UPDATE_REQUEST:
      return {
        ...state,
        fetching: false,
        fetched: false,
        type: "view",
        position: action.position
      };
      break;

    case types.UPDATE_SUCESS:
      return {
        ...state,
        fetching: false,
        fetched: false,
        type: "",
        position: action.position
      };
      break;

    case types.CREATE_REQUEST:
      return {
        ...state,
        fetching: false,
        fetched: false,
        type: "new"
      };
      break;
  }

  return state;
}
