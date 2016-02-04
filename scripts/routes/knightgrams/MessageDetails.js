import React from 'react'

import UpgradeService from 'services/UpgradeService'

import Money from 'common/Money'
import LengthLimitedTextarea from 'common/LengthLimitedTextarea'
import Analytics from 'analytics'

export default React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    onUpgradesChange: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      upgrade: {}
    }
  },

  componentWillMount () {
    UpgradeService.getAll().then(upgrades => {
      this.setState({ upgrade: upgrades[0] })
    })
  },

  handleChange (event) {
    Analytics.recordIdempotentEvent('setMessage')
    this.props.onChange(event.target.value)
  },

  onCheckChange (event) {
    if (event.target.checked) {
      this.props.onUpgradesChange([ this.state.upgrade.id ])
    } else {
      this.props.onUpgradesChange([])
    }
  },

  render () {
    return (
      <form>
        <div className='form-group'>
          <LengthLimitedTextarea placeholder='What would you like to say?' maxLength={140}
            onChange={this.handleChange} />
        </div>

        <div className='form-group'>
          <label><input type='checkbox' onChange={this.onCheckChange} /> Write my letter in calligraphy (+<Money>{this.state.upgrade.price_in_cents}</Money>)</label>
        </div>
      </form>
    )
  }
})
