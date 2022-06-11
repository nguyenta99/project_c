export const initialState = {
  isOpen: [],
  opened: true,
  borderRadius: 12,
};

const menuState = (state = initialState, action) => {
  let id
  switch (action.type) {
    case 'MENU_OPEN':
      id = action.id;
      return {
        ...state,
        isOpen: [id]
      };
    case 'SET_MENU':
      return {
        ...state,
        opened: action.opened
      };
    default:
      return state;
  }
};

export default menuState;

