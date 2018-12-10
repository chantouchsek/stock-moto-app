import Proxy from './BaseProxy'

class MakeProxy extends Proxy {
  /**
   * The constructor for the MakeProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('makes', parameters)
  }

}

export default MakeProxy
