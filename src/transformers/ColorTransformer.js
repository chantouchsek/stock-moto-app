/* ============
 * Color Transformer
 * ============
 *
 * The transformer for a color.
 */

import Transformer from './BaseTransformer'
import Color from '@/models/Color'

class ColorTransformer extends Transformer {
  /**
   * Method used to transform a fetched color.
   *
   * @returns {Color} A color model.
   */
  static fetch (color) {
    return new Color({
      id: color.id,
      uuid: color.uuid,
      name: color.name,
      description: color.description,
      active: color.active
    })
  }

  /**
   * Method used to transform a send color.
   *
   * @returns {Object} The transformed color.
   */
  static send (color) {
    return {
      id: color.id,
      name: color.name,
      description: color.description,
      active: color.active
    }
  }
}

export default ColorTransformer
