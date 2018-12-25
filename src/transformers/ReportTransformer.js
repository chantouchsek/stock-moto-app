/* ============
 * Report Transformer
 * ============
 *
 * The transformer for a report.
 */

import Transformer from './BaseTransformer'
import Report from '@/models/Report'

class ReportTransformer extends Transformer {
  /**
   * Method used to transform a fetched report.
   *
   * @returns {Report} A report model.
   */
  static fetch (report) {
    return new Report({
      id: report.id,
      uuid: report.uuid,
      name: report.name,
      description: report.description,
      active: report.active
    })
  }

  /**
   * Method used to transform a send report.
   *
   * @returns {Object} The transformed report.
   */
  static send (report) {
    return {
      id: report.id,
      name: report.name,
      description: report.description,
      active: report.active
    }
  }
}

export default ReportTransformer
