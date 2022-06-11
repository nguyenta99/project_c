export default (state = {}, action) => {
  switch (action.type) {
  case 'LOADING_STATE_UPDATED':
    return {
      ...state,
      [action.resource]: action.state
    }
  default:
    return state
  }
}

