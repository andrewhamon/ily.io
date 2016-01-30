import React from 'react'

import { Link } from 'react-router'

export default React.createClass({
  getLink () {
    return <Link to='/' query={{ to: 'You', from: 'KnightGrams' }} target='_blank'>we love you</Link>
  },

  render () {
    return (
      <div className='knightgrams -thanks'>
        <header role='main'>
          <img src='images/knightgrams-logo@2x.png' />
        </header>

        <div className='site-section'>
          <h2>Thanks!</h2>
          <p>Thanks for your order! We've got a text on its way to your crush right now. If you'd
          like, you can set an email and password to check up on the status of your candygram later.</p>

          <p><i className='fa fa-lock'></i> Once the candygram ends, we'll purge our records and
          forget everything. We will not sell your information to anyone, because {this.getLink()}.</p>

          <form>
            <div className='form-group'>
              <input type='email' placeholder='E-mail address' />
            </div>

            <div className='form-group'>
              <input type='password' placeholder='Password' />
            </div>

            <input type='submit' className='button -primary' value='Remember Me' />
          </form>
        </div>
      </div>
    )
  }
})
