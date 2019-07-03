export default function ({ $axios, store }) {
  $axios.onRequest(async (options) => {
    const token = store.state.auth.token;

    if (!token && process.browser) {
      await store.dispatch('nuxtClientInit');
    }

    if (token) {
      options.headers.common.Authorization = token;
    }
    return options;
  });
}
