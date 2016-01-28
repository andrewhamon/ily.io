import React from 'react'

export default React.createClass({
  render () {
    return (
      <form className='recipient-information'>
        <div className='form-group'>
          <input type='text' placeholder="Valentine's name (or nickname)" />
        </div>

        <div className='form-group'>
          <input type='text' placeholder="Valentine's mobile number" />
        </div>

        <input type='submit' className='button -primary' value='Continue' />
      </form>
    )
  }
})
