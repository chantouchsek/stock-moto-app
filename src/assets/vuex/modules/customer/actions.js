/* ============
 * Customer Actions
 * ============
 *
 * The actions available for the customer module.
 */

import * as types from './mutation-types'
import store from '@/assets/vuex'
import Proxy from '@/proxies/CustomerProxy'
import CustomerTransformer from '@/transformers/CustomerTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all customers will be fetched.
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
        customers: CustomerTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when all customers will be fetched.
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
        customers: CustomerTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.RELOAD, data)
    })
}

/**
 * Action fired when an customer will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   customer  The customer that will be created.
 */
const create = ({ commit }, customer) => {
  const transformedCustomer = CustomerTransformer.send(customer)

  proxy.create(transformedCustomer)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Customer has been created!',
        created: true
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The customer could not be created'
      })
    })
}

/**
 * Action fired when an customer has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   customer  The customer that has been created.
 */
const created = ({ commit }, customer) => {
  commit(types.CREATED, CustomerTransformer.fetch(customer))
}

/**
 * Action fired when an customer will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   customer  The customer that will be updated.
 */
const update = ({ commit }, customer) => {
  const transformedCustomer = CustomerTransformer.send(customer)

  proxy.update(customer.uuid, transformedCustomer)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message,
        edited: true
      })
      store.dispatch('customer/updated', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The customer could not be updated'
      })
    })
}

/**
 * Action fired when an customer has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   customer  The customer that has been updated.
 */
const updated = ({ commit }, customer) => {
  commit(types.UPDATED, CustomerTransformer.fetch(customer))
}

/**
 * Action fired when an customer will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   customer  The customer that will be destroyed.
 */
const destroy = ({ commit }, customer) => {
  proxy.destroy(customer.uuid)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Customer has been destroyed!',
        destroyed: true
      })
      store.dispatch('customer/destroyed', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The customer could not be destroyed'
      })
    })
}

/**
 * Action fired when an customer has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   customer  The customer that has been destroyed.
 */
const destroyed = ({ commit }, customer) => {
  commit(types.DESTROYED, CustomerTransformer.fetch(customer))
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
