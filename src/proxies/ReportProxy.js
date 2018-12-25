import Proxy from './BaseProxy'

class ReportProxy extends Proxy {
  /**
   * The constructor for the ReportProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('reports', parameters)
  }

}

export default ReportProxy
