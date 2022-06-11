export const ActionableExceptionHandler = (error) => {
  let result = {
    message: 'Error'
  }
  if(error.response){
    let err = error.response.data.error
    if(err){
      let message = err.message
      result.message = message
    }
    result.status = error.response.status
  }

  return result
}