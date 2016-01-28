import React from 'react'

import LengthLimitedTextarea from 'common/LengthLimitedTextarea'

export default React.createClass({
  render () {
    return (
      <form>
        <div className='form-group'>
          <LengthLimitedTextarea placeholder='What would you like to say?' maxLength={140} />
        </div>

        <div className='form-group'>
          <input type='checkbox' /> Write my letter in calligraphy (+$2)
        </div>
      </form>
    )
  }
})
