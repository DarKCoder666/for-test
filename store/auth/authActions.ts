import StorageUtil from '../../utils/storage';

const storage: StorageUtil = new StorageUtil();

function sendCode(this: any, _, { phone, redirect = true }) {
  const res = this.$axios({
    method: 'POST',
    url: '/auth/users/',
    data: {
      username: phone
    }
  });

  if (res && redirect) {
    this.$router.push('/auth/confirmCode');
  }
}

async function confirmCode(this: any, { commit }, { code, redirect = true }) {
  const res = await this.$axios({
    method: 'POST',
    url: '/auth/confirm/',
    data: {
      code
    }
  });

  if (res.data.token) {
    storage.set('jwt', res.data.token);
    commit('setToken', { token: res.data.token });
    commit('changeLoggedState', true);

    if (redirect) {
      this.$router.push('/');
    }
  }
}

function initAuth({ commit }) {
  const token = storage.get('jwt', '');
  commit('setToken', { token });

  if (token && token !== '') {
    commit('changeLoggedState', true);
  } else {
    commit('changeLoggedState', false);
  }
}

function logout(this: any, { commit }) {
  storage.delete('jwt');
  commit('setToken', { token: null });
  commit('changeLoggedState', false);
  this.$router.push('/');
}

async function checkAuth(this: any, { dispatch, commit }) {
  const token = storage.get('jwt', '');
  if (!token) return;
  const response = await this.$axios({
    method: 'POST',
    url: '/auth/jwt-update/',
    data: {
      token
    }
  }).catch(() => {
    dispatch('logout');
  });

  // eslint-disable-next-line no-console
  console.log('Response', response)

  if (response.data.token) {
    commit('setToken', { token: response.data.token });
  }
}

export default {
  sendCode,
  confirmCode,
  initAuth,
  logout,
  checkAuth
};
