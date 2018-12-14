/* ============
 * Product Actions
 * ============
 *
 * The actions available for the product module.
 */

import * as types from './mutation-types'
import store from '@/assets/vuex'
import Proxy from '@/proxies/ProductProxy'
import ProductTransformer from '@/transformers/ProductTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all products will be fetched.
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
        products: ProductTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when all products will be fetched.
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
        products: ProductTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.RELOAD, data)
    })
}

/**
 * Action fired when an product will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   product  The product that will be created.
 */
const create = ({ commit }, product) => {
  const transformedProduct = ProductTransformer.send(product)

  proxy.create(transformedProduct)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Product has been created!',
        created: true
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The product could not be created'
      })
    })
}

/**
 * Action fired when an product has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   product  The product that has been created.
 */
const created = ({ commit }, product) => {
  commit(types.CREATED, ProductTransformer.fetch(product))
}

/**
 * Action fired when an product will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   product  The product that will be updated.
 */
const update = ({ commit }, product) => {
  const transformedProduct = ProductTransformer.send(product)

  proxy.update(product.uuid, transformedProduct)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message,
        edited: true
      })
      store.dispatch('product/updated', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The product could not be updated'
      })
    })
}

/**
 * Action fired when an product has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   product  The product that has been updated.
 */
const updated = ({ commit }, product) => {
  commit(types.UPDATED, ProductTransformer.fetch(product))
}

/**
 * Action fired when an product will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   product  The product that will be destroyed.
 */
const destroy = ({ commit }, product) => {
  proxy.destroy(product.uuid)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Product has been destroyed!',
        destroyed: true
      })
      store.dispatch('product/destroyed', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The product could not be destroyed'
      })
    })
}

/**
 * Action fired when an product has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   product  The product that has been destroyed.
 */
const destroyed = ({ commit }, product) => {
  commit(types.DESTROYED, ProductTransformer.fetch(product))
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
