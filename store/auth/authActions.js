import { readCookie, writeCookie, deleteCookie } from '../../utils/cookie'

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
    writeCookie('jwt', res.data.token, 3)
    commit('setToken', { token: res.data.token })
    commit('changeLoggedState', true)
    this.$router.push('/')
  }
}

async function initAuth({ commit }) {
  const token = readCookie('jwt')
  commit('setToken', { token })
  
  if(token && token !== "") {
    commit('changeLoggedState', true)
  } else {
    commit('changeLoggedState', false)
  }
}

async function logout({ commit }) {
  deleteCookie('jwt')
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