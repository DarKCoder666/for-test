import StorageUtil from '../../utils/storage'

const storage = new StorageUtil()

function sendCode({ commit }, { phone }) {
  const res = this.$axios({
    method: 'POST',
    url: '/auth/users/',
    data: {
      username: phone
    }
  })

  if(res) {
    this.$router.push('/auth/confirmCode')
  }
}

async function confirmCode({ commit }, { code }) {
  const res = await this.$axios({
    method: 'POST',
    url: '/auth/confirm/',
    data: {
      code
    }
  })

  if(res.data.token) {
    storage.set('jwt', res.data.token)
    commit('setToken', { token: res.data.token })
    commit('changeLoggedState', true)
    this.$router.push('/')
  }
}

async function initAuth({ commit }) {
  const token = storage.get('jwt', '')
  commit('setToken', { token })
  
  if(token && token !== "") {
    commit('changeLoggedState', true)
  } else {
    commit('changeLoggedState', false)
  }
}

async function logout({ commit }) {
  storage.delete('jwt')
  commit('setToken', { token: null })
  commit('changeLoggedState', false)
  this.$router.push('/')
}

export default {
  sendCode,
  confirmCode,
  initAuth,
  logout
}