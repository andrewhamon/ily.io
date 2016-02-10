import React from 'react'
import cx from 'classnames'

import map from 'lodash/map'
import without from 'lodash/without'
import includes from 'lodash/includes'

import Money from 'common/Money'
import ProductService from 'services/ProductService'
import Analytics from 'analytics'

export default React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    closed: React.PropTypes.bool
  },

  getInitialState () {
    return {
      products: [],
      selectedProducts: []
    }
  },

  componentWillMount () {
    ProductService.getAll().then(products => {
      products.sort((a, b) => a.price_in_cents - b.price_in_cents)
      this.setState({ products })
    })
  },

  isSelected (product) {
    return includes(this.state.selectedProducts, product)
  },

  toggleProduct (product) {
    if (product.in_stock <= 0 || this.props.closed) return

    Analytics.recordIdempotentEvent('selectProduct')

    var selectedProducts

    if (includes(this.state.selectedProducts, product)) {
      selectedProducts = without(this.state.selectedProducts, product)
    } else {
      this.state.selectedProducts.push(product)
      selectedProducts = this.state.selectedProducts
    }

    this.setState({ selectedProducts }, () => {
      this.props.onChange && this.props.onChange(map(this.state.selectedProducts, 'id'))
    })
  },

  getChooseLabel (product) {
    if (this.isSelected(product)) {
      return 'Chosen'
    } else {
      return 'Choose'
    }
  },

  getStockLabel (product) {
    if (this.props.closed) {
      return 'Closed for orders'
    } else if (product.in_stock > 0) {
      return `Only ${product.in_stock} left!`
    } else {
      return 'Out of stock'
    }
  },

  render () {
    return (
      <div className='product-selector'>
        {this.state.products.map(product => (
          <div key={product.id}
            className={cx('product-item', {
              '-selected': this.isSelected(product),
              '-disabled': product.in_stock <= 0 || this.props.closed
            })}
            onClick={this.toggleProduct.bind(this, product)}>

            <aside>
              <h3 className='title'>{product.title}</h3>
              <p className='description'>{product.description}</p>
              <p className='stock'>{this.getStockLabel(product)}</p>
            </aside>

            <aside>
              <p className='price'><Money>{product.price_in_cents}</Money></p>

              <button className='button -primary choose-button'>
                <span><i className='fa fa-check'></i> {this.getChooseLabel(product)}</span>
              </button>
            </aside>
          </div>
        ))}
      </div>
    )
  }
})
