import JsonApiClient from "./JsonApiClient"

export default class AxiosClient {
  constructor(props){
    this.client = props.client
    this.resourceName = props.resourceName
    this.jsonApiClient = new JsonApiClient({
      client: this.client
    })
  }

  fetchItems = ({filters, paging, sorts, options, download, params, done, error, dataParser, relatives}) => {
    params = Object.assign({}, params)
    this.jsonApiClient.loadResources(this.resourceName, {
      filters, paging, options, download, sorts, params, done, error, relatives, dataParser
    })
  }

  fetchItem = ({ id, done, error, params, relatives}) => {
    params = Object.assign({}, params)
    this.jsonApiClient.loadResource(this.resourceName, id, {
      params, done, error, relatives
    })
  }

  createItem = ({ data, params, done, error, relatives }) => {
    params = Object.assign({}, params)
    this.jsonApiClient.createResource(this.resourceName, data, {
      params, done, error, relatives
    })
  }

  updateItem = ({ id, data, params, done, error, relatives }) => {
    params = Object.assign({}, params)
    this.jsonApiClient.updateResource(this.resourceName, id, data, {
      params, done, error, relatives
    })
  }

  deleteItem = ({ id, params, done, error }) => {
    this.jsonApiClient.deleteResource(this.resourceName, id, {
      done, error
    })
  }

  /*
    @param id: object id
    @param done: onDone
    @param error: onError


    @param data: {
      action_code: 'code',
      action_data: {
        
      }
    }
  */ 
  commitAction = ({id, data, done, error}) => {
    let path = this.client.getResourcePath(this.resourceName, id, 'actions')
    this.client.post(path, data).then(response => {
      if(done) done(response)
    }).catch(err => {
      if(error) error(err)
    })
  }
}