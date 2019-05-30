export default function ({ $axios, store, app }) {
  $axios.onRequest((options) => {
    const token = store.state.auth.token
    if(token) {
      options.headers.common['Authorization'] = token
    }
      return options
  })
}
