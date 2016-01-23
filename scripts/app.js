import ReactDOM from 'react-dom'

require('es6-promise').polyfill()
require('isomorphic-fetch')

ReactDOM.render(require('./routes'), document.getElementById('app'))
