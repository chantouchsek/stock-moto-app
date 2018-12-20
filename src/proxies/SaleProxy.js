import Proxy from './BaseProxy'

class SaleProxy extends Proxy {
  /**
   * The constructor for the SaleProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('sales', parameters)
  }

}

export default SaleProxy
