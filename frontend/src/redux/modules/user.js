// imports

// actions

const SAVE_TOKEN = 'SAVE_TOKEN';

// action creator

function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token,
  };
}

// API actions

function facebookLogin(access_token) {
  return dispatch => {
    fetch('/users/logins/facebook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      })
      .catch(error => console.log(error));
  };
}

function usernameLogin(username, password) {
  return function(dispatch) {
    fetch('rest-auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      })
      .catch(error => console.log(error));
  };
}

// reducer functions

function applySetToken(state, action) {
  const { token } = action;
  localStorage.setItem('jwt', token);
  return {
    ...state,
    isLoggedIn: true,
    token,
  };
}

function createAccount(username, password, email, name) {
  return function(dispatch) {
    fetch('/rest-auth/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password1: password,
        password2: password,
        email,
        name,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      });
  };
}

// initial state

const initialState = {
  isLoggedIn: localStorage.getItem('jwt') ? true : false,
};

// reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return applySetToken(state, action);
    default:
      return state;
  }
}

// exports

const actionCreators = {
  facebookLogin,
  usernameLogin,
  createAccount,
};

export { actionCreators };

// reducer export

export default reducer;
