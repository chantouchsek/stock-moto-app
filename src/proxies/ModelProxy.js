import Proxy from './BaseProxy'

class ModelProxy extends Proxy {
  /**
   * The constructor for the ModelProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('models', parameters)
  }

}

export default ModelProxy
