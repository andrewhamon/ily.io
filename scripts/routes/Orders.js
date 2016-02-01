import React from 'react'
import sample from 'lodash/sample'
import cx from 'classnames'

import OrderService from 'services/OrderService'

export default React.createClass({
  propTypes: {
    params: React.PropTypes.shape({
      token: React.PropTypes.string.isRequired
    }).isRequired
  },

  getInitialState () {
    return {
      orders: [],
      petName: this.getRandomPetName()
    }
  },

  componentWillMount () {
    this._getOrder()
  },

  getRandomPetName () {
    return sample([
      'Beautiful',
      'Muffin',
      'Hot Stuff',
      'Sweet Thang',
      'Babycakes',
      'Boo-Thang',
      'Hot Lips',
      'McDreamy',
      'Pop Tart',
      'Sweet Cheeks'
    ])
  },

  getPluralizedPhrase () {
    if (!this.state.orders.length === 0) return ''

    if (this.state.orders.length === 1) {
      return 'a KnightGram candygram'
    } else {
      return `${this.state.orders.length} KnightGram candygrams`
    }
  },

  _getOrder () {
    OrderService.getRecipientOrder(this.props.params.token).then(orders =>
      this.setState({ orders }))
  },

  render () {
    return (
      <div className='knightgrams -orders'>
        <header>
          <img src='images/knightgrams/knightgrams-logo-dark@2x.png' width='198' />
        </header>

        <div className='site-section'>
          <h2>Hey, {this.state.petName}!</h2>
          <p>We know that's not your name. We're not sorry.</p>

          <p>Anyway, somebody must love you, because
          you've been sent {this.getPluralizedPhrase()}!</p>

          <p>We'll text you soon with details about when and where to pickup your KnightGrams. You can also check this page for updates.</p>
        </div>

        <div className='site-section'>
          {this.state.orders.map(order =>
            <div className='order' key={order.id}>
              <div className='details'>
                <p className='producttitle'>{order.product.title}</p>
                <p className='sentto'>Sent to: <em>{order.recipient_name}</em></p>
              </div>
              <p className={cx('status', order.status)}>{order.status}</p>
            </div>
          )}
        </div>
      </div>
    )
  }
})
