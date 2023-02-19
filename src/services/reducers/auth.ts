import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {BASE_URL} from "../../utils/constatants";
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
  'auth/getUser', (_, {rejectWithValue}) => {
    return getUserAPI(`${BASE_URL}/auth/user`)
      .then (data => {
        return data.user as IUser
      })
      .catch (err => {
        console.error(`Could not get user: ${err}`);
        return rejectWithValue(err);
      })
  }
)

export const loginRequest = createAsyncThunk<IUser, TLoginForm>(
  'auth/loginRequest', (form, {rejectWithValue}) => {
    return loginAPI(`${BASE_URL}/auth/login`, form)
      .then(data => {
        saveCookie(data);
        return data.user as IUser;
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

export const registerRequest = createAsyncThunk<IUser, IPersonalInformationForm>(
  'auth/registerRequest', (form, { rejectWithValue}) => {
    return registerRequestAPI(`${BASE_URL}/auth/register`, form)
      .then (data => {
        saveCookie(data);
        return data.user as IUser
      })
      .catch (err => {
        console.error(`Registration failed: ${err}`);
        return rejectWithValue(err);
      })
  }
)

export const changeUserInfo = createAsyncThunk<IUser, IPersonalInformationForm>(
  'auth/changeUserInfo', (form, {rejectWithValue}) => {
    return changeUserInfoAPI(`${BASE_URL}/auth/user`, form)
      .then(data => {
        return data.user as IUser
      })
      .catch (err => {
        console.error(`Could not change user information: ${err}`);
        return rejectWithValue(err);
      })
  }
)

export const passwordChangeRequest = createAsyncThunk<string, {email: string}>(
  'auth/passwordChangeRequest', (email, {rejectWithValue}) => {
    return passwordChangeRequestAPI(`${BASE_URL}/password-reset`, email)
      .catch (err => {
        return rejectWithValue(`Could not request changing password: ${err}`);
      })
  }
)

export const resetPassword = createAsyncThunk<string, {password: string}>(
  'auth/resetPassword', (password, {rejectWithValue}) => {
    return resetPasswordAPI(`${BASE_URL}/password-reset/reset`, password)
      .catch (err => {
        return rejectWithValue(`Could not change password: ${err}`);
      })

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
    builder.addCase(registerRequest.rejected, (state) => {
      state.requests.registration.requestSucceed = false;
      state.requests.registration.requestError = true;
      state.userInfo.email = initialState.userInfo.email;
      state.userInfo.name = initialState.userInfo.name
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
    builder.addCase(loginRequest.rejected, (state) => {
      state.requests.login.isRequested = false;
      state.requests.login.requestSucceed = false;
      state.requests.login.requestError = true;
      state.userInfo.email = initialState.userInfo.email;
      state.userInfo.name = initialState.userInfo.name
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
    builder.addCase(passwordChangeRequest.rejected, (state) => {
      state.requests.passwordChangeRequest.isRequested = false;
      state.requests.passwordChangeRequest.requestSucceed = false;
      state.requests.passwordChangeRequest.requestError = true;
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
    builder.addCase(resetPassword.rejected, (state) => {
      state.requests.passwordReset.isRequested = false;
      state.requests.passwordReset.requestSucceed = false;
      state.requests.passwordReset.requestError = true;
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
    builder.addCase(getUser.rejected, (state) => {
      state.requests.auth.requestError = true;
      state.requests.auth.isRequested = false;
      state.userIsAuthenticated = false;
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
    builder.addCase(changeUserInfo.rejected, (state) => {
      state.requests.userInfoChange.requestError = true;
      state.requests.userInfoChange.isRequested = false;
    })

    builder.addCase(logout.fulfilled, (state) => {
      state.userInfo.email = initialState.userInfo.email;
      state.userInfo.name = initialState.userInfo.name;
      state.userIsAuthenticated = false;
    })
  }
})

export default formSlice.reducer;
