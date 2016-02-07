import React from 'react'
import { History } from 'react-router'
import debounce from 'lodash/debounce'
import cx from 'classnames'
import map from 'lodash/map'

import BaseService from 'services/BaseService'
import OrderService from 'services/OrderService'

import Expose from 'routes/knightgrams/Expose'
import ProductSelector from 'routes/knightgrams/ProductSelector'
import RecipientInformation from 'routes/knightgrams/RecipientInformation'
import MessageDetails from 'routes/knightgrams/MessageDetails'
import Money from 'common/money'

import Analytics from 'analytics'

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

    BaseService.get('stripe_token').then(token => {
      this.stripeHandler = StripeCheckout.configure({
        key: token.publishable_key,
        locale: 'auto',
        token: token => {
          this.setState({
            stripe_token: token.id,
            email: token.email
          }, () => {
            this._createOrder()
          })
        }
      })
    })

    this.updateSummary = debounce(this._updateSummary, 300)
  },

  _updateSummary () {
    OrderService.dryRun(this.state).then(
      order => this.setState({ order, valid: true }),
      () => this.setState({ valid: false }))
  },

  _submit () {
    Analytics.recordIdempotentEvent('submitOrder')
    this.stripeHandler.open({
      name: 'KnightGrams',
      description: this.getProductList(),
      amount: this.state.order.price_in_cents
    })
  },

  _createOrder () {
    Analytics._recordEvent('createOrder')

    this.setState({ loading: true })

    OrderService.create(this.state).then(
      () => this.history.pushState(null, '/thanks'),
      error => console.error(error))
  },

  selectProducts (productIds) {
    this.setState({ product_ids: productIds })
    this.updateSummary()
  },

  setOrderField (field, value) {
    this.setState({ [field]: value })
    this.updateSummary()
  },

  getProductList () {
    var titles = map(this.state.order.products, 'title')
    if (this.state.order.products.length === 1) {
      return titles[0]
    } else if (this.state.order.products.length === 2) {
      return titles.join(' and ')
    } else {
      titles[titles.length - 1] = 'and ' + titles[titles.length - 1]
      return titles.join(', ')
    }
  },

  getSummary () {
    if (this.state.valid) {
      return (
        <div className='site-section summary-section'>
          <p className='summary'>
            We're going to send{' '}
            <strong>{this.getProductList()} </strong>
            to{' '}
            <strong>{this.state.order.recipient_phone_number}</strong>.
            You'll be charged{' '}
            <strong><Money>{this.state.order.price_in_cents}</Money></strong>. All good?
          </p>
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
          <p>You can choose multiple</p>
          <ProductSelector onChange={this.selectProducts} />
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

        {this.getSummary()}

        <button onClick={this._submit} disabled={!this.state.valid}
          className={cx('button -primary -checkout', { loading: this.state.loading })}>
          <p>Checkout with Stripe!</p>
          <p className='loaders'><i className='fa fa-fw fa-spin fa-circle-o-notch'></i></p>
        </button>

        <footer>
          <h3>About</h3>

          <p>Questions? Concerns? <a href='mailto:knightgrams@ily.io'>Send us an email</a>!</p>

          <p>
            We're Andrew Hamon and Steven Petryk, two third-year UCF students. We wanted to make
            UCF's first candygram, and this is the result. We hope people will use this to spread joy!
          </p>

          <p className='notice'>
            Your information is securely processed over HTTPS. The only thing your crush sees
            is the message you write to them. We guarantee we'll make every effort to get your
            KnightGram in your crush's hands.
          </p>

          <p className='notice'>
            If you decide you want to cancel your KnightGram, send us an email from the same
            address you provided. Make sure to include the phone number you sent the KnightGram to.
            As long as your crush hasn't picked it up yet, we'll give you a full refund,
            no questions asked.
          </p>

          <p>– Andrew Hamon and Steven Petryk</p>
        </footer>
      </div>
    )
  }
})
