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

  getInitialState () {
    return {}
  },

  componentWillMount () {
    document.title = 'KnightGrams – Send a fellow Knight some love!'
    document.body.className = 'knightgrams'
  },

  selectProduct (product) {
    this.setState({ product, product_id: product.id })
  },

  setOrderField (field, value) {
    this.setState({ [field]: value })
  },

  getSummary () {
    if (this.state.valid) {
      return (
        <div className='site-section summary-section'>
          <p className='summary'>
            We're going to send{' '}
            <strong>{this.state.product && this.state.product.title} </strong>
            to{' '}
            <strong>{this.state.recipient_phone_number}</strong>.
            You'll be charged{' '}
            <strong>$6.99</strong>. All good?
          </p>

          <button className='button -primary'>Let's do it!</button>
        </div>
      )
    } else {
      return (
        <div className='site-section summary-section'>
          <p>Whoa, pal! We need some more info. Go double check what you entered.</p>
        </div>
      )
    }
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
          <ProductSelector onChange={this.selectProduct} />
        </div>

        <div className='site-section'>
          <h2>Tell us about them.</h2>
          <RecipientInformation
            onNameChange={this.setOrderField.bind(this, 'recipient_name')}
            onPhoneChange={this.setOrderField.bind(this, 'recipient_phone_number')} />
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

        {this.getSummary()}
      </div>
    )
  }
})
