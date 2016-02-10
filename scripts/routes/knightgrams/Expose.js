import React from 'react'

import Countdown from './Countdown'

export default React.createClass({
  render () {
    return (
      <div className='expose'>
        <Countdown />

        <div>
          <article>
            <img src='images/knightgrams/gram@2x.png' width='153' />

            <h3>1. Pick their poison.</h3>
            <p>Chocolate, candy, or a rose. This will accompany a note of your choosing.</p>
          </article>

          <article>
            <img src='images/knightgrams/phone@2x.png' width='66' />

            <h3>2. Give us their number.</h3>
            <p>We'll text your Valentine with the good news and information about the pickup. You'll remain anonymous.</p>
          </article>

          <article>
            <img src='images/knightgrams/banner@2x.png' width='34' />

            <h3>3. They get some love.</h3>
            <p>Pickup takes place at the Student Union, starting on Wednesday, February 10th (specific times TBA).</p>
          </article>
        </div>
      </div>
    )
  }
})
