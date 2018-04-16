import axios from "axios";

const initialState = {
  parts: [],
  loading: false
};

const GET_PARTS = "GET_PARTS";

export function getParts() {
  return {
    type: GET_PARTS,
    payload: axios.get("/api/parts")
  };
}

export default function partReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_PARTS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_PARTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        parts: action.payload.data
      };
    default:
      return state;
  }
}
