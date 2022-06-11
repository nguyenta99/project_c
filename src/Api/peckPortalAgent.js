import axios from "axios";
import config from 'config'
import Cookies from 'universal-cookie'

export const peckPortalClient = axios.create({
  baseURL: config.peckPortalApi,
  timeout: 30000,
  headers: { 'Content-Type': 'application/vnd.api+json' }
})

peckPortalClient.changePassword = ({ formData, onSuccess, onError}) => {
  peckPortalClient.post(`/api/v1/change_password`, formData, {
    headers: { 'Content-Type': 'application/json' }
  }).then(response => {
    if (onSuccess) {
      onSuccess(response)
    }
  }).catch(error => {
    if (onError) {
      onError(error)
    }
  })
}

peckPortalClient.signin = ({ formData, onSuccess, onError }) => {
  peckPortalClient.post(`/api/v1/signin`, formData, {
    headers: { 'Content-Type': 'application/json' }
  }).then(response => {
    if (onSuccess) {
      onSuccess(response)
    }
  }).catch(error => {
    if (onError) {
      onError(error)
    }
  })
}

peckPortalClient.signup = ({ formData, onSuccess, onError }) => {
  peckPortalClient.post(`/api/v1/signup`, formData, {
    headers: { 'Content-Type': 'application/json' }
  }).then(response => {
    if (onSuccess) {
      onSuccess(response)
    }
  }).catch(error => {
    if (onError) {
      onError(error)
    }
  })
}

peckPortalClient.hasToken = () => {
  const cookie = new Cookies()
  if(cookie.get('token')){
    return true
  }

  return false
}

peckPortalClient.loadTokenFromCookie = () => {
  const cookie = new Cookies()
  let token = cookie.get('token')
  if(token){
    peckPortalClient.receiveAuthToken(token, false)
  }
}

peckPortalClient.receiveAuthToken = (token, persist = true) => {
  peckPortalClient.defaults.headers['Authorization'] = 'Bearer ' + token

  if(persist){
    const cookie = new Cookies()
    cookie.set('token', token, { path: '/', domain: config.appDomain })
  }
}

peckPortalClient.verifyActivationToken = ({ formData, onSuccess, onError }) => {
  peckPortalClient.post(`/api/v1/verify_activation_token`, formData, {
    headers: { 'Content-Type': 'application/json' }
  }).then(response => {
    if (onSuccess) {
      onSuccess(response)
    }
  }).catch(error => {
    if (onError) {
      onError(error)
    }
  })
}

peckPortalClient.getResourcePath = (type, id, suffix) => {
  return '/api/v1/' + type + (id ? '/' + id : '') + (suffix ? '/' + suffix : '')
}

peckPortalClient.loadTokenFromCookie()

export default peckPortalClient