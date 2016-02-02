import React from 'react'
import { History } from 'react-router'
import debounce from 'lodash/debounce'

import AuthService from 'services/AuthService'
import OrderService from 'services/OrderService'

import Expose from 'routes/knightgrams/Expose'
import ProductSelector from 'routes/knightgrams/ProductSelector'
import RecipientInformation from 'routes/knightgrams/RecipientInformation'
import MessageDetails from 'routes/knightgrams/MessageDetails'
import SenderInformation from 'routes/knightgrams/SenderInformation'
import Money from 'common/money'

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

    if (!AuthService.currentUser) {
      AuthService.register()
    }

    this.updateSummary = debounce(this._updateSummary, 300)
  },

  _updateSummary () {
    if (this.state.stripe_token) {
      OrderService.dryRun(this.state).then(
        order => {
          this.setState({ order, valid: true })
        },
        () => this.setState({ valid: false }))
    } else {
      this.setState({ valid: false })
    }
  },

  _submit () {
    OrderService.create(this.state).then(
      () => this.history.pushState(null, '/thanks'),
      error => console.error(error))
  },

  selectProduct (product) {
    this.setState({ product_id: product.id })
    this.updateSummary()
  },

  setOrderField (field, value) {
    this.setState({ [field]: value })
    this.updateSummary()
  },

  setStripeToken (stripeToken) {
    this.setState({ stripe_token: stripeToken }, this._updateSummary)
  },

  getSummary () {
    if (this.state.valid) {
      return (
        <div className='site-section summary-section'>
          <p className='summary'>
            We're going to send{' '}
            <strong>{this.state.order && this.state.order.product.title} </strong>
            to{' '}
            <strong>{this.state.order.recipient_phone_number}</strong>.
            You'll be charged{' '}
            <strong><Money>{this.state.order.price_in_cents}</Money></strong>. All good?
          </p>

          <button onClick={this._submit} className='button -primary'>Let's do it!</button>
        </div>
      )
    } else {
      return (
        <div className='site-section summary-section'>
          <p>Wait! We need some more info. Go double check what you entered.</p>
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
          <MessageDetails
            onChange={this.setOrderField.bind(this, 'message')}
            onUpgradesChange={this.setOrderField.bind(this, 'upgrade_ids')} />
        </div>

        <div className='site-section'>
          <h2><i className='fa fa-lock'></i> Payment information</h2>
          <p>We will never store your credit card information.</p>

          <SenderInformation
            onNameChange={this.setOrderField.bind(this, 'sender_name')}
            onEmailChange={this.setOrderField.bind(this, 'email')}
            onStripeToken={this.setStripeToken} />
        </div>

        {this.getSummary()}
      </div>
    )
  }
})
