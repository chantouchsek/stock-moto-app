export default {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null
}
