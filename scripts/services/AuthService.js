import BaseService from './BaseService'

function _saveUser (user) {
  if (user) {
    localStorage.user = JSON.stringify(user)
    localStorage.token = user.token
  }

  return user
}

module.exports = {
  currentUser: JSON.parse(localStorage.customer || 'null'),

  register (user) {
    return BaseService.post('register', { user }).then(_saveUser)
  },

  login (email, password) {
    var user = { email, password }
    return BaseService.post('login', { user }).then(_saveUser)
  },

  reload () {
    return BaseService.get('user').then(_saveUser)
  }
}
