import React from 'react'

export default React.createClass({
  render () {
    return (
      <form>
        <div className='form-group'>
          <input type='text' placeholder='Your name' />
        </div>

        <div className='form-group'>
          <input type='text' placeholder='Your e-mail address' />
        </div>

        <h4><i className='fa fa-lock'></i> Payment information</h4>
        <p>We will never store your credit card information.</p>

        <div className='form-group'>
          <input type='text' placeholder='Card number' />
        </div>
        <div className='form-row'>
          <div className='form-group'>
            <input type='text' className='exp-field -mm' maxLength='2' placeholder='MM' />
          </div>
          <div className='form-group'>
            <input type='text' className='exp-field -yy' maxLength='4' placeholder='YY' />
          </div>
          <div className='form-group'>
            <input type='text' maxLength='4' placeholder='CVC' />
          </div>
        </div>
      </form>
    )
  }
})
