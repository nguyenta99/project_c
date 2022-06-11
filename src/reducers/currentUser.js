export default (state = null, action) => {
  switch (action.type) {
    case 'PROFILE_LOADING_SUCCESS':
      return action.payload.user
    default:
      return state
  }
}

