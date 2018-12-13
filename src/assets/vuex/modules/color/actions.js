/* ============
 * Color Actions
 * ============
 *
 * The actions available for the color module.
 */

import * as types from './mutation-types'
import store from '@/assets/vuex'
import Proxy from '@/proxies/ColorProxy'
import ColorTransformer from '@/transformers/ColorTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all colors will be fetched.
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
        colors: ColorTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when all colors will be fetched.
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
        colors: ColorTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.RELOAD, data)
    })
}

/**
 * Action fired when an color will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   color  The color that will be created.
 */
const create = ({ commit }, color) => {
  const transformedColor = ColorTransformer.send(color)

  proxy.create(transformedColor)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message,
        created: true
      })
    })
    .catch((response) => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The color could not be created'
      })
      store.dispatch('application/addErrors', {
        type: 'danger',
        errors: response.errors,
        error: true
      })
    })
}

/**
 * Action fired when an color has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   color  The color that has been created.
 */
const created = ({ commit }, color) => {
  commit(types.CREATED, ColorTransformer.fetch(color))
}

/**
 * Action fired when an color will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   color  The color that will be updated.
 */
const update = ({ commit }, color) => {
  const transformedColor = ColorTransformer.send(color)

  proxy.update(color.uuid, transformedColor)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message,
        edited: true
      })
      store.dispatch('color/updated', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The color could not be updated'
      })
    })
}

/**
 * Action fired when an color has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   color  The color that has been updated.
 */
const updated = ({ commit }, color) => {
  commit(types.UPDATED, ColorTransformer.fetch(color))
}

/**
 * Action fired when an color will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   color  The color that will be destroyed.
 */
const destroy = ({ commit }, color) => {
  proxy.destroy(color.uuid)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Color has been destroyed!',
        destroyed: true
      })
      store.dispatch('color/destroyed', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The color could not be destroyed'
      })
    })
}

/**
 * Action fired when an color has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   color  The color that has been destroyed.
 */
const destroyed = ({ commit }, color) => {
  commit(types.DESTROYED, ColorTransformer.fetch(color))
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
