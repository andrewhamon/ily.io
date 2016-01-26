import React from 'react'
import { History } from 'react-router'

import Expose from 'routes/knightgrams/Expose'
import ProductSelector from 'routes/knightgrams/ProductSelector'

export default React.createClass({
  mixins: [ History ],

  propTypes: {
    location: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  },

  componentWillMount () {
    document.title = 'KnightGrams – Send a fellow Knight some love!'
    document.body.className = 'knightgrams'
  },

  render () {
    return (
      <div>
        <header role='main'>
          <img src='images/knightgrams-logo@2x.png' />
        </header>

        <Expose />

        <h2>Choose your Valentine's Gift</h2>
        <ProductSelector />
      </div>
    )
  }
})
