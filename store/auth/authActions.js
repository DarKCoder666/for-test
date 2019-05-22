import { readCookie } from '../../utils/cookie'

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
    document.cookie = "jwt=" + res.data.token
    commit('changeLoggedState', true)
    this.$router.push('/')
  }
}

async function initAuth({ commit }) {
  const token = readCookie('jwt')
  console.log(token)
  if(token && token !== "") {
    commit('changeLoggedState', true)
    console.log(true)
  } else {
    console.log(false)
    commit('changeLoggedState', false)
  }
}

export default {
  sendCode,
  confirmCode,
  initAuth
}