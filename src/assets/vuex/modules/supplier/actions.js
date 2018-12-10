/* ============
 * Supplier Actions
 * ============
 *
 * The actions available for the supplier module.
 */

import * as types from './mutation-types'
import store from '@/assets/vuex'
import Proxy from '@/proxies/SupplierProxy'
import SupplierTransformer from '@/transformers/SupplierTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all suppliers will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn     Callback to edit the parameters on the proxy.
 */
const all = async ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  await proxy.all()
    .then((response) => {
      const data = {
        suppliers: SupplierTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when all suppliers will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn     Callback to edit the parameters on the proxy.
 */
const reload = async ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  await proxy.all()
    .then((response) => {
      const data = {
        suppliers: SupplierTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.RELOAD, data)
    })
}

/**
 * Action fired when an supplier will be created.
 *
 * @param {Object}   supplier  The supplier that will be created.
 */
const create = (supplier) => {
  const transformedSupplier = SupplierTransformer.send(supplier)

  proxy.create(transformedSupplier)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Supplier has been created!'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The supplier could not be created'
      })
    })
}

/**
 * Action fired when an supplier has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   supplier  The supplier that has been created.
 */
const created = ({ commit }, supplier) => {
  commit(types.CREATED, SupplierTransformer.fetch(supplier))
}

/**
 * Action fired when an supplier will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   supplier  The supplier that will be updated.
 */
const update = ({ commit }, supplier) => {
  const transformedSupplier = SupplierTransformer.send(supplier)

  proxy.update(supplier.uuid, transformedSupplier)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message,
        edited: true
      })
      store.dispatch('supplier/updated', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The supplier could not be updated'
      })
    })
}

/**
 * Action fired when an supplier has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   supplier  The supplier that has been updated.
 */
const updated = ({ commit }, supplier) => {
  commit(types.UPDATED, SupplierTransformer.fetch(supplier))
}

/**
 * Action fired when an supplier will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   supplier  The supplier that will be destroyed.
 */
const destroy = ({ commit }, supplier) => {
  proxy.destroy(supplier.uuid)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Supplier has been destroyed!',
        destroyed: true
      })
      store.dispatch('supplier/destroyed', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The supplier could not be destroyed'
      })
    })
}

/**
 * Action fired when an supplier has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   supplier  The supplier that has been destroyed.
 */
const destroyed = ({ commit }, supplier) => {
  commit(types.DESTROYED, SupplierTransformer.fetch(supplier))
}

export default {
  all,
  reload,
  create,
  created,
  update,
  updated,
  destroy,
  destroyed
}
