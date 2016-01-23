import React from 'react'
import startCase from 'lodash/startCase'

import { History, Link } from 'react-router'

export default React.createClass({
  mixins: [ History ],

  propTypes: {
    location: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  },

  componentWillMount () {
    if (!this.props.location.query.to || !this.props.location.query.from) {
      this.props.history.pushState(null, '/new')
    }

    document.body.className = 'white'
  },

  render () {
    var recipient = startCase(this.props.location.query.to)
    var sender = startCase(this.props.location.query.from)

    return (
      <div className='flex-container heart-container'>
        <div className='centered' id='message'>
          <span className='hidden' id='recipient-header'>
            Hey, {recipient}
          </span>
          <span className='hidden' id='message-intro'>I just wanted to let you know...</span>
          <div id='heart-container'>
            <img id='heart' src='images/heart.svg' alt='A heart' />
            <span className='hidden' id='ily'>ily &lt;3</span>
          </div>
          <span className='hidden' id='sender-footer'>&mdash; {sender}<span className='hidden'> &mdash;</span></span>
          <Link id='new' className='hidden' to={`/new?from=${recipient}`}>
            Make your own!
          </Link>
        </div>
        <address className='animated'>
          Designed and built by Andrew Hamon.
          Contact him at <a href='mailto:andrew@hamon.cc'>andrew@hamon.cc</a>
        </address>
      </div>
    )
  }
})
