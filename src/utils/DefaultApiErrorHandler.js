export const DefaultApiErrorHandler = (error) => {
  let result = {
    message: 'Error'
  }
  if(error.response){
    let errs = error.response.data.errors
    if(errs){
      let message = errs[0].detail
      result.message = message
    }
    result.status = error.response.status
  }

  return result
}