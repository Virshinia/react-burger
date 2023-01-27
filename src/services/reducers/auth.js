
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {BASE_URL} from "../../utils/constatants";
import {saveCookie} from "../../utils/cookies"
import {
  changeUserInfoAPI,
  getUserAPI,
  loginAPI,
  logoutAPI,
  passwordChangeRequestAPI,
  registerRequestAPI, resetPasswordAPI
} from "../../utils/api";


export const getUser = createAsyncThunk(
  'auth/getUser', (_, {fulfillWithValue, rejectWithValue}) => {
    return getUserAPI(`${BASE_URL}/auth/user`)
      .then (data => {
        return fulfillWithValue(data.user)
      })
      .catch (err => {
        console.error(`Could not get user: ${err}`);
        return rejectWithValue(err);
      })
  }
)

export const loginRequest = createAsyncThunk(
  'auth/loginRequest', (form, {fulfillWithValue, rejectWithValue}) => {
    return loginAPI(`${BASE_URL}/auth/login`, form)
      .then(data => {
        saveCookie(data);
        return fulfillWithValue(data.user);
      })
      .catch (err => {
        console.error(`Could not login: ${err}`);
        return rejectWithValue(err);
      })
  });


export const logout = createAsyncThunk(
  'auth/logout', (_, {rejectWithValue}) => {
    return logoutAPI(`${BASE_URL}/auth/logout`)
      .catch (err => {
        console.error(`Could not logout: ${err}`);
        return rejectWithValue(err);
      })
  }
)

export const registerRequest = createAsyncThunk(
  'auth/registerRequest', (form, {fulfillWithValue, rejectWithValue}) => {
    return registerRequestAPI(`${BASE_URL}/auth/register`, form)
      .then (data => {
        saveCookie(data);
        return fulfillWithValue(data.user)
      })
      .catch (err => {
        console.error(`Registration failed: ${err}`);
        return rejectWithValue(err);
      })
  }
)

export const changeUserInfo = createAsyncThunk(
  'auth/changeUserInfo', (form, {fulfillWithValue, rejectWithValue}) => {
    return changeUserInfoAPI(`${BASE_URL}/auth/user`, form)
      .then(data => {
        return fulfillWithValue(data.user)
      })
      .catch (err => {
        console.error(`Could not change user information: ${err}`);
        return rejectWithValue(err);
      })
  }
)

export const passwordChangeRequest = createAsyncThunk(
  'auth/passwordChangeRequest', (email, {rejectWithValue}) => {
    return passwordChangeRequestAPI(`${BASE_URL}/password-reset`, email)
      .catch (err => {
        return rejectWithValue(`Could not request changing password: ${err}`);
      })
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword', (password, {rejectWithValue}) => {
    return resetPasswordAPI(`${BASE_URL}/password-reset/reset`, password)
      .catch (err => {
        return rejectWithValue(`Could not change password: ${err}`);
      })

  }
)


const initialState = {
  userIsAuthenticated: false,

  userInfo: {
    email: '',
    password: '',
    name: ''
  },

  requests: {
    auth: {
      userInfoRequested: false,
      requestError: false,
      requestSucceed: false,
    },
    login: {
      loginRequested: false,
      requestError: false,
      requestSucceed: false,
    },
    registration: {
      registrationRequested: false,
      requestError: false,
      requestSucceed: false,
    },
    passwordChange: {
      passwordChangeRequested: false,
      resetPasswordRequested: false,
      requestError: false,
      requestSucceed: false,
      resetError: false,
      resetSucceed: false,
    },
    userInfoChange: {
      userInfoChangeRequested: false,
      requestError: false,
      requestSucceed: false,
    }
  }
}

export const formSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerRequest.pending, (state) => {
      state.requests.registration.registrationRequested = true
    })
    builder.addCase(registerRequest.fulfilled, (state, action) => {
      state.userInfo.email = action.payload.email;
      state.userInfo.name = action.payload.name;
      state.userIsAuthenticated = true;
      state.requests.registration.registrationRequested = false;
    })
    builder.addCase(registerRequest.rejected, (state) => {
      state.requests.registration.requestSucceed = false;
      state.requests.registration.requestError = true;
      state.userInfo.email = initialState.email;
      state.userInfo.name = initialState.name
    })

    builder.addCase(loginRequest.pending, (state) => {
      state.requests.login.loginRequested = true
    })
    builder.addCase(loginRequest.fulfilled, (state, action) => {

      state.userInfo.email = action.payload.email;
      state.userInfo.name = action.payload.name;
      state.userIsAuthenticated = true;
      state.requests.login.loginRequested = false;
      state.requests.login.requestSucceed = true;
    })
    builder.addCase(loginRequest.rejected, (state) => {
      state.requests.login.loginRequested = false;
      state.requests.login.requestSucceed = false;
      state.requests.login.requestError = true;
      state.userInfo.email = initialState.email;
      state.userInfo.name = initialState.name
    })

    builder.addCase(passwordChangeRequest.pending, (state) => {
      state.requests.passwordChange.passwordChangeRequested = true;
      state.requests.passwordChange.requestSucceed = false;
      state.requests.passwordChange.requestError = false;
      state.requests.passwordChange.resetError = false;
      state.requests.passwordChange.resetSucceed = false;

    })
    builder.addCase(passwordChangeRequest.fulfilled, (state) => {
      state.requests.passwordChange.requestSucceed = true;
    })
    builder.addCase(passwordChangeRequest.rejected, (state) => {
      state.requests.passwordChange.passwordChangeRequested = false;
      state.requests.passwordChange.requestSucceed = false;
      state.requests.passwordChange.requestError = true;
    })

    builder.addCase(resetPassword.pending, (state) => {
      state.requests.passwordChange.resetPasswordRequested = true;
      state.requests.passwordChange.resetSucceed = false;
    })
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.requests.passwordChange.passwordChangeRequested = false;
      state.requests.passwordChange.resetPasswordRequested = false;
      state.requests.passwordChange.resetSucceed = true;
    })
    builder.addCase(resetPassword.rejected, (state) => {
      state.requests.passwordChange.resetPasswordRequested = false;
      state.requests.passwordChange.resetSucceed = false;
      state.requests.passwordChange.resetError = true;
    })

    builder.addCase(getUser.pending, (state) => {
      state.requests.auth.userInfoRequested = true
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.requests.auth.requestSucceed = true;
      state.requests.auth.userInfoRequested = false;
      state.userIsAuthenticated = true;
      state.userInfo.email = action.payload.email;
      state.userInfo.name = action.payload.name;
    })
    builder.addCase(getUser.rejected, (state) => {
      state.requests.auth.requestError = true;
      state.requests.auth.userInfoRequested = false;
      state.userIsAuthenticated = false;
    })

    builder.addCase(changeUserInfo.pending, (state) => {
      state.requests.userInfoChange.userInfoChangeRequested = true
    })
    builder.addCase(changeUserInfo.fulfilled, (state, action) => {
      state.requests.userInfoChange.requestSucceed = true;
      state.requests.userInfoChange.userInfoChangeRequested = false;
      state.userInfo.email = action.payload.email;
      state.userInfo.name = action.payload.name;

    })
    builder.addCase(changeUserInfo.rejected, (state) => {
      state.requests.userInfoChange.requestError = true;
      state.requests.userInfoChange.userInfoRequested = false;
    })

    builder.addCase(logout.fulfilled, (state) => {
      state.userInfo.email = initialState.email;
      state.userInfo.name = initialState.name;
      state.userIsAuthenticated = false;
    })
  }
})

export default formSlice.reducer;
