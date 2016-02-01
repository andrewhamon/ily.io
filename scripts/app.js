import ReactDOM from 'react-dom'

require('es6-promise').polyfill()
require('isomorphic-fetch')

import BaseService from 'services/BaseService'

BaseService.get('stripe_token').then(response => Stripe.setPublishableKey(response.publishable_key))

ReactDOM.render(require('./routes'), document.getElementById('app'))
