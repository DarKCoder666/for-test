import mutations from './authMutations'
import actions from './authActions'

export const state = () => ({
  loggedIn : false
});

export {
  mutations,
  actions
}