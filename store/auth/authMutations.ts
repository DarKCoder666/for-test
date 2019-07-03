function changeLoggedState(state, value) {
  state.loggedIn = value;
}

function setToken(state, { token }) {
  state.token = token;
}

export default {
  changeLoggedState,
  setToken
};
