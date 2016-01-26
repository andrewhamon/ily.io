import React from 'react'

import { History } from 'react-router'

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

        <div className='expose'>
          <article>
            <img src='images/knightgrams/gram@2x.png' width='153' />

            <h3>1. Pick their poison.</h3>
            <p>Chocolate, candy, or a rose.</p>
          </article>

          <article>
            <img src='images/knightgrams/phone@2x.png' width='66' />

            <h3>2. Give us their number.</h3>
            <p>We'll text your crush with instructions.</p>
          </article>

          <article>
            <img src='images/knightgrams/banner@2x.png' width='34' />

            <h3>3. They get some love.</h3>
            <p>Pickup takes place on campus.</p>
          </article>
        </div>
      </div>
    )
  }
})
