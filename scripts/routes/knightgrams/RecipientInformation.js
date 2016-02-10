import React from 'react'
import Analytics from 'analytics'

export default React.createClass({
  propTypes: {
    onNameChange: React.PropTypes.func.isRequired,
    onPhoneChange: React.PropTypes.func.isRequired,
    closed: React.PropTypes.bool
  },

  setName (event) {
    Analytics.recordIdempotentEvent('setRecipientName')
    this.props.onNameChange(event.target.value)
  },

  setPhone (event) {
    Analytics.recordIdempotentEvent('setRecipientPhone')
    this.props.onPhoneChange(event.target.value)
  },

  render () {
    return (
      <form className='recipient-information'>
        <div className='form-group'>
          <input disabled={this.props.closed} onChange={this.setName}
            type='text' placeholder="Valentine's name (or nickname)" />
        </div>

        <div className='form-group'>
          <input disabled={this.props.closed} onChange={this.setPhone}
            type='tel' placeholder="Valentine's mobile number" />
        </div>
      </form>
    )
  }
})
