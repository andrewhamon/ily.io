import BaseService from './BaseService'

module.exports = {
  getAll () {
    return BaseService.get('upgrades')
  }
}
