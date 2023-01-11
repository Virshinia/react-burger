import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {BASE_URL, saveCookie, getCookie} from "../../utils/constatants";

export const registerRequest = createAsyncThunk(
  'auth/registerRequest',
  async (form, {fulfillWithValue, rejectWithValue}) => {
    try {
      const res = await fetch (`${BASE_URL}/auth/register`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(form)
        });
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json();
      saveCookie(data);
      return fulfillWithValue(data.user);
    }
    catch (error) {
      console.error(`Could not register: ${error}`);
      return rejectWithValue(error)
    }
  }
)

export const loginRequest = createAsyncThunk(
  'auth/loginRequest',
  async (form, {fulfillWithValue, rejectWithValue}) => {
    try {
      const res = await fetch (`${BASE_URL}/auth/login`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('refreshToken')
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(form)
        });
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json();
      saveCookie(data);
      return fulfillWithValue(data.user);
    }
    catch (error) {
      console.error(`Could not login: ${error.message}`);
      return rejectWithValue(error)
    }
  }
)

export const passwordChangeRequest = createAsyncThunk(
  'auth/passwordChangeRequest',
  async (email, {fulfillWithValue, rejectWithValue}) => {
    try {
      const res = await fetch (`${BASE_URL}/password-reset`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(email)
        });
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json();
      return fulfillWithValue(data.success);
    }
    catch (error) {
      console.error(`Could not send email for you: ${error}`);
      return rejectWithValue(error)
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (form, {fulfillWithValue, rejectWithValue}) => {
    try {
      const res = await fetch (`${BASE_URL}/password-reset/reset`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(form)
        });
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json();
      return fulfillWithValue(data.success);
    }
    catch (error) {
      console.error(`Could not reset your password: ${error}`);
      return rejectWithValue(error)
    }
  }
)

/*const initialState = {
  email: '',
  password: '',
  name: '',
  requestError: false,
  requestSucceed: false,
  userIsAuthenticated: false,
  loginRequested: false,
  registrationRequested: false,
  passwordChangeRequested: false,
  resetPasswordRequested: false,
  passwordChanged: false
}*/

const initialState = {
  userIsAuthenticated: false,

  userInfo: {
    email: '',
    password: '',
    name: ''
  },

  requests: {
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
    }
  }
}

export const formSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    editInput: (state, action) => {
      state.userInfo[action.payload.name] = action.payload.value
    }
  },
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
      state.requests.login.requestSucceed = false;
      state.requests.login.requestError = true;
      state.userInfo.email = initialState.email;
      state.userInfo.name = initialState.name
    })

    builder.addCase(passwordChangeRequest.pending, (state) => {
      state.requests.passwordChange.passwordChangeRequested = true
    })
    builder.addCase(passwordChangeRequest.fulfilled, (state) => {
      state.requests.passwordChange.passwordChangeRequested = false;
      state.requests.passwordChange.requestSucceed = true;
    })
    builder.addCase(passwordChangeRequest.rejected, (state) => {
      state.requests.passwordChange.passwordChangeRequested = false;
      state.requests.passwordChange.requestSucceed = false;
      state.requests.passwordChange.requestError = true;
    })

    builder.addCase(resetPassword.pending, (state) => {
      state.requests.passwordChange.resetPasswordRequested = true
    })
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.requests.passwordChange.resetPasswordRequested = false;
      state.requests.passwordChange.requestSucceed = true;
    })
    builder.addCase(resetPassword.rejected, (state) => {
      state.requests.passwordChange.resetPasswordRequested = false;
      state.requests.passwordChange.requestSucceed = false;
      state.requests.passwordChange.requestError = true;
    })
  }
})


/*export const formSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    editInput: (state, action) => {
      state[action.payload.name] = action.payload.value
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerRequest.pending, (state) => {
      state.registrationRequested = true
    })
    builder.addCase(registerRequest.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.userIsAuthenticated = true;
      state.registrationRequested = false;
    })
    builder.addCase(registerRequest.rejected, (state) => {
      state.requestSucceed = false;
      state.requestError = true;
      state.email = initialState.email;
      state.name = initialState.name
    })

    builder.addCase(loginRequest.pending, (state) => {
      state.loginRequested = true
    })
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.userIsAuthenticated = true;
      state.loginRequested = false;
    })
    builder.addCase(loginRequest.rejected, (state) => {
      state.requestSucceed = false;
      state.requestError = true;
      state.email = initialState.email;
      state.name = initialState.name
    })

    builder.addCase(passwordChangeRequest.pending, (state) => {
      state.passwordChangeRequested = true
    })
    builder.addCase(passwordChangeRequest.fulfilled, (state, action) => {
      state.passwordChangeRequested = false;
      state.requestSucceed = action.payload;
    })
    builder.addCase(passwordChangeRequest.rejected, (state) => {
      state.passwordChangeRequested = false;
      state.requestSucceed = false;
      state.requestError = true;
    })

    builder.addCase(resetPassword.pending, (state) => {
      state.resetPasswordRequested = true
    })
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.resetPasswordRequested = false;
      state.passwordChanged = true;
      state.requestSucceed = action.payload;
    })
    builder.addCase(resetPassword.rejected, (state) => {
      state.resetPasswordRequested = false;
      state.requestSucceed = false;
      state.requestError = true;
    })
  }
})*/

export const {editInput} = formSlice.actions
export default formSlice.reducer;
