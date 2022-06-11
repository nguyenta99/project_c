export default class JsonApiClient {
  constructor(props) {
    this.client = props.client
  }

  loadResources = (type, { filters, paging, sorts, done, error, download, relatives, resourcePath, dataParser, params }) => {
    if (!type) throw "Action loadResources: type is required"

    let requestParams = {
      params: {
        ...params,
        ...filter_hash_to_param(filters),
      },
      headers: {}
    }

    if (paging) {
      if (paging.page) requestParams.params['page[number]'] = paging.page
      if (paging.perPage) requestParams.params['page[size]'] = paging.perPage
    }

    if (sorts) {
      requestParams.params.sort = sorts.map((sort) =>
        sort.dir === 'asc' ? sort.name : ('-' + sort.name)
      ).join(',')
    }

    if (download) {
      requestParams.responseType = "arraybuffer"
    }

    let path = resourcePath || this.client.getResourcePath(type)

    return this.client.get(path, requestParams)
      .then(response => {
        if (download) {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `${download.name}`)
          document.body.appendChild(link);
          link.click()

          if (done) done(response.data)
        } else {
          let items = dataParser ? dataParser(response) : resourcesMapper(response.data)
          let meta = parseResourceMeta(response.data)

          if (items.length > 0 && relatives) {
            Object.keys(relatives).forEach((key) => {
              let rel = relatives[key]
              let rel_name = rel.resource || key
              let ids = [...new Set(items.map((item) => item[rel.foreignKey]).filter((id) => !!id))]
              let loader = rel.loader?.jsonApiClient || this

              if (ids.length > 0) {
                loader.loadResources(rel_name, {
                  filters: { 'ids': ids.join(',') }, params: rel.params, done: (relItems) => {
                    items.forEach((item) => {
                      item[key] = relItems.find((it) => String(it.id) === String(item[rel.foreignKey]))
                    })

                    if (done) done(items, meta)
                  }, error: (event) => {
                    if (done) done(items, meta)
                    if (error) error(event)
                  }
                })
              } else {
                if (done) done(items, meta)
              }
            })
          } else {
            if (done) done(items, meta)
          }
        }
      })
      .catch(event => {
        if (error) error(this.errorParser(event))
      })
  }

  loadResource = (type, id, { done, error, resourcePath, params, relatives }) => {
    if (!type) throw "Action loadResource: type is required"

    let path = resourcePath || this.client.getResourcePath(type, id)

    return this.client.get(path, { params: params })
      .then(response => {
        let item = resourcesMapper(response.data)
        let meta = parseResourceMeta(response.data)
        if (item && relatives) {
          this.buildRelatives(item, relatives, {
            done: (item) => {
              if (done) done(item, meta)
            }, error: (errors) => {
              if (error) error(errors)
              if (done) done(item, meta)
            }
          })
        } else {
          if (done) done(item, meta)
        }
      }).catch(event => {
        if (error) error(this.errorParser(event))
      })
  }

  createResource = (type, data, { done, error, resourcePath, params, relatives }) => {
    if (!type) throw "Action createResource: type is required"

    let path = resourcePath || this.client.getResourcePath(type)

    return this.client.post(path, {
      data: {
        type: type,
        attributes: data
      },
      ...params
    }).then(response => {
      let item = resourcesMapper(response.data)
      let meta = parseResourceMeta(response.data)

      if (item && relatives) {
        this.buildRelatives(item, relatives, {
          done: (item) => {
            if (done) done(item, meta)
          }, error: (errors) => {
            if (error) error(errors)
            if (done) done(item, meta)
          }
        })
      } else {
        if (done) done(item, meta)
      }
    })
      .catch(event => {
        console.error(event)
        if (error) error(this.errorParser(event))
      })
  }

  updateResource = (type, id, data, { done, error, resourcePath, params, relatives }) => {

  }

  deleteResource = (type, id, { done, error, resourcePath }) => {

  }

  buildRelatives = (item, relatives, { done, error }) => {
    let requests = []
    Object.keys(relatives).forEach((key) => {
      let rel = relatives[key]
      let rel_name = rel.resource || key
      let id = item[rel.foreignKey]
      let loader = rel.loader?.jsonApiClient || this

      if (id) {
        requests.push(new Promise((resolve, reject) => {
          loader.loadResource(rel_name, id, {
            params: rel.params, done: (relItem) => {
              resolve({ [key]: relItem })
            }, error: (errors) => {
              if (error) error(errors)
            }
          })
        }))
      }
    })

    Promise.all(requests).then((relItems) => {
      relItems.forEach((relItem) => Object.keys(relItem).forEach((key) => { item[key] = relItem[key] }))
      if (done) done(item)
    });
  }
}

const errorParser = (event) => {
  let errors = []

  if (event.response && event.response.data) {
    let data = event.response.data
    if (event.request.responseType === 'arraybuffer') {
      data = JSON.parse(
        String.fromCharCode.apply(null, new Uint8Array(data))
      )
    }
    if (data['errors']) {
      errors = errors.concat(data['errors'])
    } else {
      errors.push({
        detail: JSON.stringify(data)
      })
    }
  } else {
    errors.push({
      detail: event.message
    })
  }

  return errors
}

const filter_hash_to_param = (filters) => {
  filters = filters || {}
  let _filters = {}

  Object.keys(filters).forEach((k) => {
    let v = filters[k]
    if (v && v !== '') {
      _filters['filter[' + k + ']'] = v
    }
  })

  return _filters
}

const resourceMapper = (data, included) => {
  let resource = Object.assign({
    id: data.id,
  }, data.attributes)

  Object.keys(data.relationships || {}).forEach((rel_key) => {
    let r_data = data.relationships[rel_key].data
    if (r_data) {
      // has_many
      if (Array.isArray(r_data)) {
        if (!resource[rel_key]) resource[rel_key] = []
        r_data.forEach((item) => {
          let { type, id } = item
          if (included[type] && included[type][id]) {
            resource[rel_key].push(resourceMapper(included[type][id], included))
          }
        })

        // has_one
      } else {
        let { type, id } = r_data
        if (included[type] && included[type][id]) {
          resource[rel_key] = resourceMapper(included[type][id], included)
        }
      }
    }
  })

  return resource
}

const resourcesMapper = (response) => {
  let data = response.data
  let included = response.included || []
  let includedMap = {}

  included.forEach((obj) => {
    if (!includedMap[obj.type]) includedMap[obj.type] = {}
    includedMap[obj.type][obj.id] = obj
  })

  return Array.isArray(data) ?
    data.map((item) => resourceMapper(item, includedMap)) :
    resourceMapper(data, includedMap)
}

const parseResourceMeta = (response) => {
  let meta = {}
  Object.keys(response.meta || {}).forEach((key) => {
    if (response.meta[key] !== null && !['pageCount'].includes(key)) {
      let newKey = key.split('_').map((k) => k[0].toUpperCase() + k.slice(1)).join(' ')
      meta[newKey] = response.meta[key]
    }
  })

  return meta
}
