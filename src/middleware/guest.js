import store from '@/assets/vuex'

export default (to, from, resolve, reject) => {
  if (store.state.auth.authenticated) {
    resolve({ name: 'Dashboard' })
  } else {
    reject()
  }
}
