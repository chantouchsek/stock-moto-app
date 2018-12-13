/* ============
 * Product Transformer
 * ============
 *
 * The transformer for a product.
 */

import Transformer from './BaseTransformer'
import Product from '@/models/Product'

class ProductTransformer extends Transformer {
  /**
   * Method used to transform a fetched product.
   *
   * @returns {Product} A product model.
   */
  static fetch (product) {
    return new Product({
      id: product.id,
      uuid: product.uuid,
      name: product.name,
      makeId: product.make_id,
      modelId: product.model_id,
      supplierId: product.supplier_id,
      categoryId: product.category_id,
      description: product.description,
      price: product.price,
      cost: product.cost,
      qty: product.qty,
      colors: product.colors,
      year: product.year,
      importFrom: product.import_from,
      category: product.category,
      make: product.make,
      model: product.model,
      supplier: product.supplier
    })
  }

  /**
   * Method used to transform a send product.
   *
   * @returns {Object} The transformed product.
   */
  static send (product) {
    return {
      id: product.id,
      uuid: product.uuid,
      name: product.name,
      make_id: product.makeId,
      model_id: product.modelId,
      supplier_id: product.supplierId,
      category_id: product.categoryId,
      description: product.description,
      price: product.price,
      cost: product.cost,
      qty: product.qty,
      engine_number: product.engineNumber,
      color: product.color,
      plate_number: product.plateNumber,
      frame_number: product.frameNumber,
      status: product.status,
      code: product.code,
      year: product.year,
      import_from: product.importFrom,
    }
  }
}

export default ProductTransformer
