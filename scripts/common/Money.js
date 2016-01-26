import React from 'react'

export default React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  getPrice () {
    return '$' + +this.props.children / 100
  },

  render () {
    return (
      <span>{this.getPrice()}</span>
    )
  }
})
