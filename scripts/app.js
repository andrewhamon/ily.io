import Analytics from './analytics'
import ReactDOM from 'react-dom'

Analytics.recordPageView()

require('es6-promise').polyfill()
require('isomorphic-fetch')

ReactDOM.render(require('./routes'), document.getElementById('app'))
