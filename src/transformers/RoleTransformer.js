/* ============
 * Role Transformer
 * ============
 *
 * The transformer for a role.
 */

import Transformer from './BaseTransformer'
import Role from '@/models/Role'

class RoleTransformer extends Transformer {
  /**
   * Method used to transform a fetched role.
   *
   * @returns {Role} A role model.
   */
  static fetch (role) {
    return new Role({
      id: role.id,
      name: role.name
    })
  }

  /**
   * Method used to transform a send role.
   *
   * @returns {Object} The transformed role.
   */
  static send (role) {
    return {
      id: role.id,
      name: role.name
    }
  }
}

export default RoleTransformer
