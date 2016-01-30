import BaseService from 'services/BaseService'

module.exports = {
  dryRun (order) {
    return BaseService.post('orders/dry_run', { order })
  },

  create (order) {
    return BaseService.post('orders', { order })
  }
}
