import Proxy from './BaseProxy'

class ColorProxy extends Proxy {
  /**
   * The constructor for the ColorProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('colors', parameters)
  }

}

export default ColorProxy
