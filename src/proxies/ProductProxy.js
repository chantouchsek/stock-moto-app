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

  /**
   * Method used to destroy a given item.
   *
   * @param {int} id The given identifier.
   *
   * @param {int} colorId
   * @returns {Promise} The result in a promise.
   */
  destroyColor (id, colorId) {
    return this.submit('delete', `/${this.endpoint}/${id}/${colorId}`)
  }

  /**
   * Method used to fetch a given item.
   *
   * @returns {Promise} The result in a promise.
   */
  findBy () {
    return this.submit('get', `/${this.endpoint}/filter`)
  }
}

export default ProductProxy
