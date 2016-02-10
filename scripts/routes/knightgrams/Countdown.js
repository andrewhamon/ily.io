import React from 'react'
import moment from 'moment'

var closingTime = moment('2016021104', 'YYYYMMDDHH')

export default React.createClass({
  componentDidMount () {
    this.tick()
  },

  tick () {
    this.forceUpdate()
    setTimeout(this.tick, 1000)
  },

  render () {
    var diff = closingTime.diff(moment())
    var days = closingTime.diff(moment(), 'days')
    var hours = closingTime.diff(moment(), 'hours') % 24
    var minutes = closingTime.diff(moment(), 'minutes') % 60
    var seconds = closingTime.diff(moment(), 'seconds') % 60

    console.log(days, hours, minutes, seconds)

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
  }
})
