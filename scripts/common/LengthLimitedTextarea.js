import React from 'react'

export default React.createClass({
  propTypes: {
    maxLength: React.PropTypes.number.isRequired
  },

  getInitialState () {
    return {
      value: ''
    }
  },

  setMessage (event) {
    this.setState({ value: event.target.value.trim() })
  },

  render () {
    return (
      <div className='length-limited-textarea'>
        <textarea {...this.props} onChange={this.setMessage}></textarea>
        <span>{this.state.value.length}/{this.props.maxLength}</span>
      </div>
    )
  }
})
