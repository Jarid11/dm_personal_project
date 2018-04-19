import axios from "axios";

const initialState = {
  user: {}
};

const GET_USER = "GET_USER";
const ADD_SHIPPING_INFO = "ADD_SHIPPING_INFO";

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/user")
  };
}

export function addShippingInfo(
  firstname,
  lastname,
  phonenumber,
  email,
  streetaddress,
  extraaddressinfo,
  city,
  state,
  zip
) {
  return {
    type: ADD_SHIPPING_INFO,
    payload: axios.post("/api/addShipInfo", {
      firstname,
      lastname,
      phonenumber,
      email,
      streetaddress,
      extraaddressinfo,
      city,
      state,
      zip
    })
  };
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
    case `${ADD_SHIPPING_INFO}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    default:
      return state;
  }
}
