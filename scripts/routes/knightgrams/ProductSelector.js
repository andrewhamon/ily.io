import React from 'react'
import cx from 'classnames'

import Money from 'common/Money'
import ProductService from 'services/ProductService'

export default React.createClass({
  getInitialState () {
    return {
      products: [],
      selectedProduct: null
    }
  },

  componentWillMount () {
    ProductService.getAll().then(products => {
      products.sort((a, b) => a.price_in_cents - b.price_in_cents)
      this.setState({ products })
    })
  },

  isSelected (product) {
    return this.state.selectedProduct === product
  },

  selectProduct (product) {
    this.setState({ selectedProduct: product })
  },

  getChooseLabel (product) {
    if (this.isSelected(product)) {
      return 'Chosen'
    } else {
      return 'Choose'
    }
  },

  render () {
    return (
      <div className='product-selector'>
        {this.state.products.map(product => (
          <div key={product.id}
            className={cx('product-item', { '-selected': this.isSelected(product) })}
            onClick={this.selectProduct.bind(this, product)}>

            <h3 className='title'>{product.title}</h3>
            <p className='description'>{product.description}</p>
            <p className='price'><Money>{product.price_in_cents}</Money></p>

            <button className='button -primary choose-button'>
              <span><i className='fa fa-check'></i> {this.getChooseLabel(product)}</span>
            </button>
          </div>
        ))}
      </div>
    )
  }
})
