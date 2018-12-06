import Proxy from './BaseProxy'

class CategoryProxy extends Proxy {
  /**
   * The constructor for the CategoryProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('categories', parameters)
  }

}

export default CategoryProxy
