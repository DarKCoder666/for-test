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

function checkAuth(this: any, { dispatch }) {
  const token = storage.get('jwt', '');
  if (!token) return;
  this.$axios({
    method: 'POST',
    url: '/auth/jwt-update/',
    data: {
      token
    }
  }).catch(() => {
    dispatch('logout');
  });
}

export default {
  sendCode,
  confirmCode,
  initAuth,
  logout,
  checkAuth
};
