/* ============
 * Make Actions
 * ============
 *
 * The actions available for the make module.
 */

import * as types from './mutation-types'
import store from '@/assets/vuex'
import Proxy from '@/proxies/MakeProxy'
import MakeTransformer from '@/transformers/MakeTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all makes will be fetched.
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
        makes: MakeTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when all makes will be fetched.
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
        makes: MakeTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.RELOAD, data)
    })
}

/**
 * Action fired when an make will be created.
 *
 * @param {Object}   make  The make that will be created.
 */
const create = (make) => {
  const transformedMake = MakeTransformer.send(make)

  proxy.create(transformedMake)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Make has been created!'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The make could not be created'
      })
    })
}

/**
 * Action fired when an make has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   make  The make that has been created.
 */
const created = ({ commit }, make) => {
  commit(types.CREATED, MakeTransformer.fetch(make))
}

/**
 * Action fired when an make will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   make  The make that will be updated.
 */
const update = ({ commit }, make) => {
  const transformedMake = MakeTransformer.send(make)

  proxy.update(make.uuid, transformedMake)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message,
        edited: true
      })
      store.dispatch('make/updated', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The make could not be updated'
      })
    })
}

/**
 * Action fired when an make has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   make  The make that has been updated.
 */
const updated = ({ commit }, make) => {
  commit(types.UPDATED, MakeTransformer.fetch(make))
}

/**
 * Action fired when an make will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   make  The make that will be destroyed.
 */
const destroy = ({ commit }, make) => {
  proxy.destroy(make.uuid)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Make has been destroyed!',
        destroyed: true
      })
      store.dispatch('make/destroyed', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The make could not be destroyed'
      })
    })
}

/**
 * Action fired when an make has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   make  The make that has been destroyed.
 */
const destroyed = ({ commit }, make) => {
  commit(types.DESTROYED, MakeTransformer.fetch(make))
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
