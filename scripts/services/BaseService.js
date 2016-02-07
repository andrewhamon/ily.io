import defaultsDeep from 'lodash/defaultsDeep'

module.exports = {
  get (uri, options = {}) {
    return this._wrap(fetch(this._url(uri), options))
  },

  put (uri, body, options = {}) {
    return this._wrap(fetch(this._url(uri), this._jsonOptions(options, body, 'put')))
  },

  post (uri, body, options = {}) {
    return this._wrap(fetch(this._url(uri), this._jsonOptions(options, body, 'post')))
  },

  delete (uri, options = {}) {
    return this._wrap(fetch(this._url(uri), { method: 'delete' }))
  },

  log (response) {
    console.log(response)
    return response
  },

  _jsonOptions (options, body, method) {
    defaultsDeep(options, {
      method: method || 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return options
  },

  _wrap (request) {
    return request.then(this._checkStatus).then(this._parseJson)
  },

  _checkStatus (response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  },

  _parseJson (response) {
    return response.json()
  },

  _url (uri) {
    if (process.env.NODE_ENV === 'production') {
      return `${process.env.PRODUCTION_API_BASE}/${uri}`
    } else {
      return `${process.env.STAGING_API_BASE}/${uri}`
    }
  }
}
