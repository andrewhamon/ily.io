import React from 'react'

export default React.createClass({
  propTypes: {
    maxLength: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func
  },

  getInitialState () {
    return {
      value: ''
    }
  },

  setMessage (event) {
    this.setState({ value: event.target.value.trim() })
    this.props.onChange && this.props.onChange(event)
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
