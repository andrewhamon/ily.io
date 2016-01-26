import React from 'react'

import { History } from 'react-router'

export default React.createClass({
  mixins: [ History ],

  propTypes: {
    history: React.PropTypes.object.isRequired,
    location: React.PropTypes.object
  },

  componentWillMount () {
    document.title = 'Tell someone you love them!'
    document.body.className = 'red'
  },

  getInitialState () {
    var sender = this.props.location.query.from

    return {
      to: '',
      from: sender || ''
    }
  },

  encode (uri) {
    return encodeURIComponent(uri.trim()).replace('%20', '+')
  },

  setFrom (event) {
    this.setState({ from: this.encode(event.target.value) })
  },

  setTo (event) {
    this.setState({ to: this.encode(event.target.value) })
  },

  preview (event) {
    event.preventDefault()

    if (this.state.from && this.state.to) {
      this.props.history.pushState(null, '/', this.state)
    }
  },

  getLink () {
    if (this.state.from && this.state.to) {
      return `http://ily.io/?from=${this.state.from}&to=${this.state.to}`
    } else {
      return ''
    }
  },

  render () {
    return (
      <div className='flex-container heart-container'>
        <div className='centered' id='pageContentContainer'>
          <h1 id='new-header'>Tell them how you really feel.</h1>
          <form onSubmit={this.preview}>
            <div id='link-form'>
              <div><input type='text' onChange={this.setFrom} value={this.state.from} placeholder='From' autoComplete='off' /></div>
              <div><input type='text' onChange={this.setTo} value={this.state.to} placeholder='To' autoComplete='off' /></div>
            </div>
            <div className='button'>
              <button type='submit' className='new'>Preview</button>
            </div>
          </form>
          <div id='link-output'>
            <input type='text' name='link-output' id='link-output-box' value={this.getLink()} autoComplete='off' />
          </div>
        </div>
        <address>
          Designed and built by Andrew Hamon.
          Contact him at <a href='mailto:andrew@hamon.cc'>andrew@hamon.cc</a>
        </address>
      </div>
    )
  }
})
