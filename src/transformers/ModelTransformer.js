/* ============
 * Model Transformer
 * ============
 *
 * The transformer for a model.
 */

import Transformer from './BaseTransformer'
import Model from '@/models/Model'

class ModelTransformer extends Transformer {
  /**
   * Method used to transform a fetched model.
   *
   * @returns {Model} A model model.
   */
  static fetch (model) {
    return new Model({
      id: model.id,
      uuid: model.uuid,
      makeId: model.make_id,
      name: model.name,
      description: model.description,
      active: model.active,
      make: model.make
    })
  }

  /**
   * Method used to transform a send model.
   *
   * @returns {Object} The transformed model.
   */
  static send (model) {
    return {
      id: model.id,
      name: model.name,
      make_id: model.makeId,
      description: model.description,
      active: model.active
    }
  }
}

export default ModelTransformer
