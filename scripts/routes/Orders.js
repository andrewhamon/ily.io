import React from 'react'
import sample from 'lodash/sample'
import cx from 'classnames'
import map from 'lodash/map'
import { Link } from 'react-router'

import find from 'lodash/find'

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
    if (this.state.orders.length === 0) return ''

    if (this.state.orders.length === 1) {
      return 'a KnightGram candygram'
    } else {
      return `${this.state.orders.length} KnightGram candygrams`
    }
  },

  getProductTitles (order) {
    var titles = map(order.products, 'title')
    if (order.products.length === 1) {
      return titles[0]
    } else if (order.products.length === 2) {
      return titles.join(' and ')
    } else {
      titles[titles.length - 1] = 'and ' + titles[titles.length - 1]
      return titles.join(', ')
    }
  },

  getPickupInfo () {
    if (find(this.state.orders, order => order.status === 'ready')) {
      return (
        <div>
          <h4>Pick up your KnightGram!</h4>
          <p>Pickups begin <strong>today</strong>. They'll last from 12-3PM. Look for our picnic blanket on the boardwalk leading from memory mall to the Student Union!</p>
          <p>Can't make it? No worries! Check back later today for info on pickup times tomorrow and Friday.</p>
          <p><a href='mailto:knightgrams@ily.io'>Shoot us an email</a> if you have any questions.</p>

          <a className='map-link' href="https://goo.gl/maps/dGqjwcrYaZ92" target="_blank">
            <img src="https://maps.googleapis.com/maps/api/staticmap?center=28.602865,-81.199738&zoom=17&scale=2&size=500x200&markers=28.602865,-81.199738&key=AIzaSyCjSVUpViTEwOKBVqKvzrSzPq6oMxTBWAc" />
          </a>
        </div>
      )
    } else {
      return (
        <p>
          We're still working on your {this.state.orders.length == 1 ? 'KnightGram' : 'KnightGrams'}.
          We'll send you a text when it's time to pick up.
        </p>
      )
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

          {this.getPickupInfo()}
        </div>

        <div className='site-section order-list'>
          {this.state.orders.map(order =>
            <div className='order' key={order.id}>
              <div className='details'>
                <p className='producttitle'><em>#{order.id}</em> {this.getProductTitles(order)}</p>
                <p className='sentto'>Sent to: <em>{order.recipient_name}</em></p>
              </div>
              <p className={cx('status', order.status)}>{order.status}</p>
            </div>
          )}

        </div>

        <Link to='/knightgrams' className='button -primary'>Send someone a KnightGram!</Link>
      </div>
    )
  }
})
