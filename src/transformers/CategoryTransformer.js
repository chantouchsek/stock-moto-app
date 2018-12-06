/* ============
 * Category Transformer
 * ============
 *
 * The transformer for a category.
 */

import Transformer from './BaseTransformer'
import Category from '@/models/Category'

class CategoryTransformer extends Transformer {
  /**
   * Method used to transform a fetched category.
   *
   * @returns {Category} A category model.
   */
  static fetch (category) {
    return new Category({
      id: category.id,
      uuid: category.uuid,
      name: category.name,
      description: category.description,
      active: category.active
    })
  }

  /**
   * Method used to transform a send category.
   *
   * @returns {Object} The transformed category.
   */
  static send (category) {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      active: category.active
    }
  }
}

export default CategoryTransformer
