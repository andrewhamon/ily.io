import React from 'react'

import { Link } from 'react-router'

export default React.createClass({
  getLink () {
    return <Link to='/' query={{ to: 'You', from: 'KnightGrams' }} target='_blank'>we love you</Link>
  },

  render () {
    return (
      <div className='knightgrams -thanks'>
        <header>
          <img src='images/knightgrams/knightgrams-logo-dark@2x.png' width='198' />
        </header>

        <div className='site-section'>
          <h2>Thanks!</h2>
          <p>Thanks for your order! We've got a text on its way to your crush right now.</p>
        </div>

        <Link to='/knightgrams' className='button -primary'>Send another KnightGram!</Link>
      </div>
    )
  }
})
