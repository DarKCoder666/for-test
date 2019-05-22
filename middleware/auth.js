export default function ({ store, redirect }) {
  console.log(1)
  store.dispatch('auth/initAuth')
}