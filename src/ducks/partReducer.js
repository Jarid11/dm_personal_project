import axios from "axios";

const initialState = {
  parts: [],
  categories: [],
  loading: false
};

const GET_PARTS = "GET_PARTS";
const GET_PART_CATEGORIES = "GET_PART_CATEGORIES"

const CHANGE_PART_NAME = "CHANGE_PART_NAME";
const CHANGE_PART_CATEGORY = "CHANGE_PART_CATEGORY";

const CHANGE_PART_PRICE = "CHANGE_PART_PRICE";
const CHANGE_PART_MODEL = "CHANGE_PART_MODEL";
const CHANGE_PART_SPECIAL = "CHANGE_PART_SPECIAL";


export function getParts() {
  return {
    type: GET_PARTS,
    payload: axios.get("/api/parts")
  };
}

export function getPartCategories() {
  return {
    type: GET_PART_CATEGORIES,
    payload: axios.get("/api/partCategories")
  }
}

export function changePartName(partId, name) {
  return {
    type: CHANGE_PART_NAME,
    payload: axios.put("/api/changePartName", { partId, name })
  }
}

export function changePartCategory(partId, category) {
  return {
    type: CHANGE_PART_CATEGORY,
    payload: axios.put("/api/changePartCategory", { partId, category })
  }
}

export function changePartPrice(partId, price) {
  return {
    type: CHANGE_PART_PRICE,
    payload: axios.put("/api/changePartPrice", { partId, price })
  }
}

export function changePartModel(partId, model) {
  return {
    type: CHANGE_PART_MODEL,
    payload: axios.put("/api/changePartModel", { partId, model })
  }
}

export function changePartSpecial(partId, special) {
  return {
    type: CHANGE_PART_SPECIAL,
    payload: axios.put("/api/changePartSpecial", { partId, special })
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
    case `${CHANGE_PART_CATEGORY}_FULFILLED`:
    case `${CHANGE_PART_PRICE}_FULFILLED`:
    case `${CHANGE_PART_MODEL}_FULFILLED`:
    case `${CHANGE_PART_SPECIAL}_FULFILLED`:
      return {
        ...state,
        loading: false,
        parts: action.payload.data
      };
    case `${GET_PART_CATEGORIES}_FULFILLED`:
      return {
        ...state,
        categories: action.payload.data
      }
    default:
      return state;
  }
}
