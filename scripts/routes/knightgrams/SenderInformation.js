import React from 'react'
import debounce from 'lodash/debounce'
import every from 'lodash/every'

export default React.createClass({
  propTypes: {
    onStripeToken: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      error: null
    }
  },

  componentWillMount () {
    this.checkCardValid = debounce(this._checkCardValid, 300)
  },

  handleChange () {
    this.checkCardValid()
  },

  getError () {
    if (this.state.error) {
      return (
        <div className='form-error'>
          <i className='fa fa-exclamation-triangle'></i> {this.state.error}
        </div>
      )
    } else {
      return null
    }
  },

  _checkCardValid () {
    var { number, expMonth, expYear, cvc } = this.refs
    var valid = every([ number, expMonth, expYear, cvc ], ref => ref.value && ref.value.trim() !== '')

    if (valid) {
      Stripe.card.createToken(this.refs.form, this._onStripe)
    }
  },

  _onStripe (status, response) {
    if (response.error) {
      this.setState({ error: response.error.message })
      this.props.onStripeToken(null)
    } else {
      this.setState({ error: null })
      this.props.onStripeToken(response.id)
    }
  },

  render () {
    return (
      <form ref='form' onChange={this.handleChange}>
        <div className='form-group'>
          <input type='email' placeholder='Your e-mail address' />
        </div>
        <div className='form-group'>
          <input type='tel' ref='number' data-stripe='number' placeholder='Card number' />
        </div>
        <div className='form-row'>
          <div className='form-group'>
            <input type='tel' ref='expMonth' data-stripe='exp-month' className='exp-field -mm' maxLength='2' placeholder='MM' />
          </div>
          <div className='form-group'>
            <input type='tel' ref='expYear' data-stripe='exp-year' className='exp-field -yy' maxLength='4' placeholder='YY' />
          </div>
          <div className='form-group'>
            <input type='tel' ref='cvc' data-stripe='cvc' className='cvc' maxLength='4' placeholder='CVC' />
          </div>
        </div>

        {this.getError()}
      </form>
    )
  }
})
