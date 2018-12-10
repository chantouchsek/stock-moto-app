import Proxy from './BaseProxy'

class CustomerProxy extends Proxy {
  /**
   * The constructor for the CustomerProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('customers', parameters)
  }

}

export default CustomerProxy
