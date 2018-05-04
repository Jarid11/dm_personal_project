import axios from "axios";

const initialState = {
  cart: [],
  cartImgs: [],
  totalItems: 0,
  grandTotal: 0
};

const GET_CART = "GET_CART";
const GET_TOTAL_ITEMS = "GET_TOTAL_ITEMS";
const GET_GRAND_TOTAL = "GET_GRAND_TOTAL";
const GET_CART_IMGS = "GET_CART_IMGS";
const ADD_TO_CART = "ADD_TO_CART";
const UPDATE_CART = "UPDATE_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const EMPTY_CART = "EMPTY_CART";

export function getCart() {
  return {
    type: GET_CART,
    payload: axios.get("/api/cart")
  };
}

export function getTotalItems() {
  return {
    type: GET_TOTAL_ITEMS,
    payload: axios.get("/api/cartItems")
  };
}

export function getGrandTotal() {
  return {
    type: GET_GRAND_TOTAL,
    payload: axios.get("/api/grandTotal")
  };
}

export function getCartImgs() {
  return {
    type: GET_CART_IMGS,
    payload: axios.get("/api/cartImgs")
  };
}

export function addToCart(id, qty) {
  return {
    type: ADD_TO_CART,
    payload: axios.post(`/api/cart`, { id, qty })
  };
}

export function updateCart(id, qty) {
  return {
    type: UPDATE_CART,
    payload: axios.put(`/api/cart`, { id, qty })
  };
}

export function deleteFromCart(id) {
  return {
    type: DELETE_FROM_CART,
    payload: axios.delete(`/api/cart/${id}`)
  };
}

export function emptyCart() {
  return {
    type: EMPTY_CART,
    payload: axios.delete("/api/emptyCart")
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_CART}_FULFILLED`:
    case `${ADD_TO_CART}_FULFILLED`:
    case `${UPDATE_CART}_FULFILLED`:
    case `${DELETE_FROM_CART}_FULFILLED`:
    case `${EMPTY_CART}_FULFILLED`:
      return {
        ...state,
        cart: action.payload.data
      };
    case `${GET_TOTAL_ITEMS}_FULFILLED`:
      return {
        ...state,
        totalItems: +action.payload.data.sum
      };
    case `${GET_GRAND_TOTAL}_FULFILLED`:
      return {
        ...state,
        grandTotal: +action.payload.data.sum
      };
    case `${GET_CART_IMGS}_FULFILLED`:
      return {
        ...state,
        cartImgs: action.payload.data
      };
    default:
      return state;
  }
}
