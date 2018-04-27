import axios from "axios";

const initialState = {
  parts: [],
  loading: false
};

const GET_PARTS = "GET_PARTS";
const CHANGE_PART_NAME = "CHANGE_PART_NAME"

export function getParts() {
  return {
    type: GET_PARTS,
    payload: axios.get("/api/parts")
  };
}

export function changePartName(partId, name) {
  return {
    type: CHANGE_PART_NAME,
    payload: axios.put("/api/changePartName", { partId, name })
  }
}

export default function partReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_PARTS}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_PARTS}_FULFILLED`:
    case `${CHANGE_PART_NAME}_FULFILLED`:
      return {
        ...state,
        loading: false,
        parts: action.payload.data
      };
    default:
      return state;
  }
}
