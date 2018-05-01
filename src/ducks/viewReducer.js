const initialState = {
    showHamburger: false
};

const GET_HAMBURGER_MENU = "GET_HAMBURGER_MENU";


export function getHamburgerMenu() {
  return {
    type: GET_HAMBURGER_MENU
  };
}

export default function viewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HAMBURGER_MENU:
      return {
        ...state,
        showHamburger: !state.showHamburger
      };
    default:
      return state;
  }
}
