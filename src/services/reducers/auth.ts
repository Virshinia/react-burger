import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {saveCookie} from "../../utils/cookies"
import {IPersonalInformationForm, IUser, TLoginForm} from "../../utils/common-interfaces";
import {
  changeUserInfoAPI,
  getUserAPI,
  loginAPI,
  logoutAPI,
  passwordChangeRequestAPI,
  registerRequestAPI, resetPasswordAPI
} from "../../utils/api";


export const getUser = createAsyncThunk<IUser>(
  'auth/getUser', () => {
    return getUserAPI(`auth/user`)
      .then (data => {
        return data.user as IUser
      })
  }
)

export const loginRequest = createAsyncThunk<IUser, TLoginForm>(
  'auth/loginRequest', (form) => {
    return loginAPI(`auth/login`, form)
      .then(data => {
        saveCookie(data);
        return data.user as IUser;
      })
  });


export const logout = createAsyncThunk(
  'auth/logout', () => {
    return logoutAPI(`auth/logout`)
  }
)

export const registerRequest = createAsyncThunk<IUser, IPersonalInformationForm>(
  'auth/registerRequest', (form) => {
    return registerRequestAPI(`auth/register`, form)
      .then (data => {
        saveCookie(data);
        return data.user as IUser
      })
  }
)

export const changeUserInfo = createAsyncThunk<IUser, IPersonalInformationForm>(
  'auth/changeUserInfo', (form) => {
    return changeUserInfoAPI(`auth/user`, form)
      .then(data => {
        return data.user as IUser
      })
  }
)

export const passwordChangeRequest = createAsyncThunk<string, {email: string}>(
  'auth/passwordChangeRequest', (email) => {
    return passwordChangeRequestAPI(`password-reset`, email)
  }
)

export const resetPassword = createAsyncThunk<string, {password: string}>(
  'auth/resetPassword', (password) => {
    return resetPasswordAPI(`password-reset/reset`, password)
  }
)

interface IUserInfo {
  userIsAuthenticated: boolean;
  userInfo: IPersonalInformationForm
}

interface IRequest {
  isRequested: boolean;
  requestError: boolean,
  requestSucceed: boolean,
}

interface IRequests {
  requests: {
    auth: IRequest;
    login: IRequest;
    registration: IRequest;
    userInfoChange: IRequest;
    passwordChangeRequest: IRequest;
    passwordReset: IRequest
  }

}

type TAuthState = IUserInfo & IRequests & {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  }

const initialState: TAuthState = {
  userIsAuthenticated: false,

  userInfo: {
    email: '',
    password: '',
    name: ''
  },

  requests: {
    auth: {
      isRequested: false,
      requestError: false,
      requestSucceed: false,
    },
    login: {
      isRequested: false,
      requestError: false,
      requestSucceed: false,
    },
    registration: {
      isRequested: false,
      requestError: false,
      requestSucceed: false,
    },
    userInfoChange: {
      isRequested: false,
      requestError: false,
      requestSucceed: false,
    },
    passwordChangeRequest: {
      isRequested: false,
      requestError: false,
      requestSucceed: false,
    },
    passwordReset : {
      isRequested: false,
      requestError: false,
      requestSucceed: false,
    }
  },
  loading: "idle"
}

export const formSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerRequest.pending, (state) => {
      state.requests.registration.isRequested = true
    })
    builder.addCase(registerRequest.fulfilled, (state, action) => {
      state.userInfo.email = action.payload.email;
      state.userInfo.name = action.payload.name;
      state.userIsAuthenticated = true;
      state.requests.registration.isRequested = false;
    })
    builder.addCase(registerRequest.rejected, (state, action) => {
      state.requests.registration.requestSucceed = false;
      state.requests.registration.requestError = true;
      state.userInfo.email = initialState.userInfo.email;
      state.userInfo.name = initialState.userInfo.name
      console.log(`Registration failed: ${action.error.message}`)
    })

    builder.addCase(loginRequest.pending, (state) => {
      state.requests.login.isRequested = true
    })
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      state.userInfo.email = action.payload.email;
      state.userInfo.name = action.payload.name;
      state.userIsAuthenticated = true;
      state.requests.login.isRequested = false;
      state.requests.login.requestSucceed = true;
    })
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.requests.login.isRequested = false;
      state.requests.login.requestSucceed = false;
      state.requests.login.requestError = true;
      state.userInfo.email = initialState.userInfo.email;
      state.userInfo.name = initialState.userInfo.name
      console.log(`Couldn't login: ${action.error.message}`)
    })

    builder.addCase(passwordChangeRequest.pending, (state) => {
      state.requests.passwordChangeRequest.isRequested = true;
      state.requests.passwordChangeRequest.requestSucceed = false;
      state.requests.passwordChangeRequest.requestError = false;
      state.requests.passwordReset.requestError = false;
      state.requests.passwordReset.requestSucceed = false;
    })
    builder.addCase(passwordChangeRequest.fulfilled, (state) => {
      state.requests.passwordChangeRequest.requestSucceed = true;
    })
    builder.addCase(passwordChangeRequest.rejected, (state, action) => {
      state.requests.passwordChangeRequest.isRequested = false;
      state.requests.passwordChangeRequest.requestSucceed = false;
      state.requests.passwordChangeRequest.requestError = true;
      console.log(`Couldn't request for password change: ${action.error.message}`)
    })

    builder.addCase(resetPassword.pending, (state) => {
      state.requests.passwordReset.isRequested = true;
      state.requests.passwordReset.requestSucceed = false;
    })
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.requests.passwordChangeRequest.isRequested = false;
      state.requests.passwordReset.isRequested = false;
      state.requests.passwordReset.requestSucceed = true;
    })
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.requests.passwordReset.isRequested = false;
      state.requests.passwordReset.requestSucceed = false;
      state.requests.passwordReset.requestError = true;
      console.log(`Couldn't reset password: ${action.error.message}`)
    })

    builder.addCase(getUser.pending, (state) => {
      state.requests.auth.isRequested = true
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.requests.auth.requestSucceed = true;
      state.requests.auth.isRequested = false;
      state.userIsAuthenticated = true;
      state.userInfo.email = action.payload.email;
      state.userInfo.name = action.payload.name;
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.requests.auth.requestError = true;
      state.requests.auth.isRequested = false;
      state.userIsAuthenticated = false;
      console.log(`Couldn't get user: ${action.error.message}`);
    })

    builder.addCase(changeUserInfo.pending, (state) => {
      state.requests.userInfoChange.isRequested = true
    })
    builder.addCase(changeUserInfo.fulfilled, (state, action) => {
      state.requests.userInfoChange.requestSucceed = true;
      state.requests.userInfoChange.isRequested = false;
      state.userInfo.email = action.payload.email;
      state.userInfo.name = action.payload.name;
    })
    builder.addCase(changeUserInfo.rejected, (state, action) => {
      state.requests.userInfoChange.requestError = true;
      state.requests.userInfoChange.isRequested = false;
      console.log(`Couldn't change user info: ${action.error.message}`)
    })

    builder.addCase(logout.fulfilled, (state) => {
      state.userInfo.email = initialState.userInfo.email;
      state.userInfo.name = initialState.userInfo.name;
      state.userIsAuthenticated = false;
    })
  }
})

export default formSlice.reducer;
