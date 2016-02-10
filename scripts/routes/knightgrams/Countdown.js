import React from 'react'
import moment from 'moment'

export default React.createClass({
  propTypes: {
    time: React.PropTypes.instanceOf(moment)
  },

  componentDidMount () {
    setInterval(this.tick, 1000)
  },

  tick () {
    this.forceUpdate()
  },

  render () {
    var diff = this.props.time.diff(moment())
    var days = Math.max(this.props.time.diff(moment(), 'days'), 0)
    var hours = Math.max(this.props.time.diff(moment(), 'hours') % 24, 0)
    var minutes = Math.max(this.props.time.diff(moment(), 'minutes') % 60, 0)
    var seconds = Math.max(this.props.time.diff(moment(), 'seconds') % 60, 0)

    if (diff > 0) {
      return (
        <div className='countdown'>
          <h3>Orders close in</h3>

          <div className='clock'>
            <div>
              <p>{days}</p>
              <p>{days == 1 ? 'day' : 'days'}</p>
            </div>
            <div>
              <p>{hours}</p>
              <p>{hours == 1 ? 'hour' : 'hours'}</p>
            </div>
            <div>
              <p>{minutes}</p>
              <p>{minutes == 1 ? 'minute' : 'minutes'}</p>
            </div>
            <div>
              <p>{seconds}</p>
              <p>{seconds == 1 ? 'second' : 'seconds'}</p>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='countdown'>
          <h3>Orders have closed. See you next year!</h3>
        </div>
      )
    }
  }
})
