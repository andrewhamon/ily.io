import React from 'react'
import { History } from 'react-router'

import Expose from 'routes/knightgrams/Expose'
import ProductSelector from 'routes/knightgrams/ProductSelector'
import RecipientInformation from 'routes/knightgrams/RecipientInformation'
import MessageDetails from 'routes/knightgrams/MessageDetails'
import SenderInformation from 'routes/knightgrams/SenderInformation'

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

        <div className='site-section'>
          <h2>Choose your Valentine's gift</h2>
          <ProductSelector />
        </div>

        <div className='site-section'>
          <h2>Tell us about them.</h2>
          <RecipientInformation />
        </div>

        <div className='site-section'>
          <h2>Let's write them a letter.</h2>
          <MessageDetails />
        </div>

        <div className='site-section'>
          <h2>Your information</h2>
          <p>Don't worry, your crush won't see this.</p>
          <SenderInformation />
        </div>

        <div className='site-section summary-section'>
          <p className='summary'>
            We're going to send{' '}
            <strong>1 rose </strong>
            to{' '}
            <strong>(813) 316-8895</strong>.
            You'll be charged{' '}
            <strong>$6.99</strong>. All good?
          </p>

          <button className='button -primary'>Let's do it!</button>
        </div>
      </div>
    )
  }
})
