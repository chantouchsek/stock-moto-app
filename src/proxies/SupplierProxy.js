import Proxy from './BaseProxy'

class SupplierProxy extends Proxy {
  /**
   * The constructor for the SupplierProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('suppliers', parameters)
  }

}

export default SupplierProxy
