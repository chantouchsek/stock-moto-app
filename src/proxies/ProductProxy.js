import Proxy from './BaseProxy'

class ProductProxy extends Proxy {
  /**
   * The constructor for the ProductProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('products', parameters)
  }

}

export default ProductProxy
