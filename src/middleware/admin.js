import store from '@/assets/vuex'

export default (to, from, resolve, reject) => {
  if (store.getters['auth/user'].role !== 'admin') {
    resolve({ name: 'Dashboard' })
  } else {
    reject()
  }
}
