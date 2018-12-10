/* ============
 * Make Transformer
 * ============
 *
 * The transformer for a make.
 */

import Transformer from './BaseTransformer'
import Make from '@/models/Make'

class MakeTransformer extends Transformer {
  /**
   * Method used to transform a fetched make.
   *
   * @returns {Make} A make model.
   */
  static fetch (make) {
    return new Make({
      id: make.id,
      uuid: make.uuid,
      name: make.name,
      description: make.description,
      active: make.active,
      models: make.models
    })
  }

  /**
   * Method used to transform a send make.
   *
   * @returns {Object} The transformed make.
   */
  static send (make) {
    return {
      id: make.id,
      name: make.name,
      description: make.description,
      active: make.active
    }
  }
}

export default MakeTransformer
