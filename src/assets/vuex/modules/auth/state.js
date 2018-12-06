/* ============
 * Auth State
 * ============
 *
 * The state of the authentication module.
 */

export default {
  authenticated: false,
  token: localStorage.getItem('access_token'),
  user: {}
}
