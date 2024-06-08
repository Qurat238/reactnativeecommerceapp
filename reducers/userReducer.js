import { createReducer, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = "https://backend-gray-sigma.vercel.app";

// Actions
export const loginRequest = createAction("loginRequest");
export const loginSuccess = createAction("loginSuccess");
export const loginFail = createAction("loginFail");

export const registerRequest = createAction("registerRequest");
export const registerSuccess = createAction("registerSuccess");
export const registerFail = createAction("registerFail");

export const loadUserRequest = createAction("loadUserRequest");
export const loadUserSuccess = createAction("loadUserSuccess");
export const loadUserFail = createAction("loadUserFail");

export const logoutSuccess = createAction("logoutSuccess");
export const logoutFail = createAction("logoutFail");

export const updateProfileRequest = createAction("updateProfileRequest");
export const updateProfileSuccess = createAction("updateProfileSuccess");
export const updateProfileFail = createAction("updateProfileFail");
export const updateProfileReset = createAction("updateProfileReset");

export const updatePasswordRequest = createAction("updatePasswordRequest");
export const updatePasswordSuccess = createAction("updatePasswordSuccess");
export const updatePasswordFail = createAction("updatePasswordFail");
export const updatePasswordReset = createAction("updatePasswordReset");

export const updateUserRequest = createAction("updateUserRequest");
export const updateUserSuccess = createAction("updateUserSuccess");
export const updateUserFail = createAction("updateUserFail");
export const updateUserReset = createAction("updateUserReset");

export const deleteUserRequest = createAction("deleteUserRequest");
export const deleteUserSuccess = createAction("deleteUserSuccess");
export const deleteUserFail = createAction("deleteUserFail");
export const deleteUserReset = createAction("deleteUserReset");

export const forgotPasswordRequest = createAction("forgotPasswordRequest");
export const forgotPasswordSuccess = createAction("forgotPasswordSuccess");
export const forgotPasswordFail = createAction("forgotPasswordFail");
export const forgotPasswordReset = createAction("forgotPasswordReset");

export const resetPasswordRequest = createAction("resetPasswordRequest");
export const resetPasswordSuccess = createAction("resetPasswordSuccess");
export const resetPasswordFail = createAction("resetPasswordFail");
export const resetPasswordReset = createAction("resetPasswordReset");

export const allUsersRequest = createAction("allUsersRequest");
export const allUsersSuccess = createAction("allUsersSuccess");
export const allUsersFail = createAction("allUsersFail");

export const userDetailsRequest = createAction("userDetailsRequest");
export const userDetailsSuccess = createAction("userDetailsSuccess");
export const userDetailsFail = createAction("userDetailsFail");

export const clearError = createAction("clearError");

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${serverUrl}/api/v1/login`, { email, password }, config);

    dispatch(loginSuccess(data.user));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

//Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(`${serverUrl}/api/v1/register`, userData, config);

    dispatch(registerSuccess(data.user));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};

//Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${serverUrl}/api/v1/me`);

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

//Logout
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${serverUrl}/api/v1/logout`);

    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

//Update Profile
export const updateProfile = (userData) => async(dispatch) => {
  try {
      dispatch(updateProfileRequest());
      
      const config = {
          headers : {
              "Content-Type":"multipart/form-data"
          }
      };

      const {data} = await axios.put(
          `${serverUrl}/api/v1/me/update`,
          userData,
          config
      )

      dispatch(updateProfileSuccess(data.success));

  } catch (error) {
      dispatch(updateProfileFail(error.response.data.message));
  }
}

//Update Password
export const updatePassword = (passwords) => async(dispatch) => {
  try {
      dispatch(updatePasswordRequest());
      
      const config = {
          headers : {
              "Content-Type":"application/json"
          }
      };

      const {data} = await axios.put(
          `${serverUrl}/api/v1/password/update`,
          passwords,
          config
      )

      dispatch(updatePasswordSuccess(data.success));

  } catch (error) {
      dispatch(updatePasswordFail(error.response.data.message));
  }
}

//Update User
export const updateUser = (id, userData) => async(dispatch) => {
  try {
      dispatch(updateUserRequest());
      
      const config = {
          headers : {
              "Content-Type":"application/json"
          }
      };

      const {data} = await axios.put(
          `${serverUrl}/api/v1/admin/user/${id}`,
          userData,
          config
      )

      dispatch(updateUserSuccess(data.success));

  } catch (error) {
      dispatch(updateUserFail(error.response.data.message));
  }
}

//Delete User
export const deleteUser = (id) => async(dispatch) => {
  try {
      dispatch(deleteUserRequest());
      
      const {data} = await axios.delete(`${serverUrl}/api/v1/admin/user/${id}`)

      dispatch(deleteUserSuccess(data));

  } catch (error) {
      dispatch(deleteUserFail(error.response.data.message));
  }
}

//Forgot Password
export const forgotPassword = (email) => async(dispatch) => {
  try {
      dispatch(forgotPasswordRequest());
      
      const config = {
          headers : {
              "Content-Type":"application/json"
          }
      };

      const {data} = await axios.post(
          `${serverUrl}/api/v1/password/forgot`,
          email,
          config
      )

      dispatch(forgotPasswordSuccess(data.message));

  } catch (error) {
      dispatch(forgotPasswordFail(error.response.data.message));
  }
}

//Reset Password
export const resetPassword = (passwords) => async(dispatch) => {
  try {
      dispatch(resetPasswordRequest());
      
      const config = {
          headers : {
              "Content-Type":"application/json"
          }
      };

      const {data} = await axios.put(
          `${serverUrl}/api/v1/password/reset`,
          passwords,
          config
      )

      dispatch(resetPasswordSuccess(data.success));

  } catch (error) {
      dispatch(resetPasswordFail(error.response.data.message));
  }
}

//Get All Users
export const getAllUsers = () => async(dispatch) => {
  try {
      dispatch(allUsersRequest());
      const {data} = await axios.get(`${serverUrl}/api/v1/admin/users`);

      dispatch(allUsersSuccess(data.users));

  } catch (error) {
      dispatch(allUsersFail(error.response.data.message));
  }
}

//Get User Details
export const getUserDetails = (id) => async(dispatch) => {
  try {
      dispatch(userDetailsRequest());
      const {data} = await axios.get(`${serverUrl}/api/v1/admin/user/${id}`);

      dispatch(userDetailsSuccess(data.user));

  } catch (error) {
      dispatch(userDetailsFail(error.response.data.message));
  }
}

//Clearing the errors
export const clearErrors = () => async(dispatch) =>  {
  dispatch(clearError());
}



//Reducers
export const userReducer = createReducer(
  {user:{}},
  (builder) => {
    builder
      .addCase(loginRequest, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(loginSuccess, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.message = action.payload;
      })
      .addCase(loginFail, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(registerRequest, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(registerSuccess, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.message = action.payload;
      })
      .addCase(registerFail, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(loadUserRequest, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(loadUserSuccess, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.message = action.payload;
      })
      .addCase(loadUserFail, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(logoutSuccess, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutFail, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.payload;
      })
      .addCase(clearError, (state) => {
        state.error = null;
      })
  }
);

export const profileReducer = createReducer(
  {}, (builder) => {
    builder
    .addCase(updateProfileRequest, (state) => {
        state.loading = true;
    })
    .addCase(updateProfileSuccess, (state,action) => {
        state.loading = false;
        state.isUpdated = action.payload;
    })
    .addCase(updateProfileFail, (state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(updateProfileReset, (state) => {
        state.isUpdated = false;
    })
    .addCase(updatePasswordRequest, (state) => {
        state.loading = true;
    })
    .addCase(updatePasswordSuccess, (state,action) => {
        state.loading = false;
        state.isUpdated = action.payload;
    })
    .addCase(updatePasswordFail, (state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(updatePasswordReset, (state) => {
        state.isUpdated = false;
    })
    .addCase(updateUserRequest, (state) => {
        state.loading = true;
    })
    .addCase(updateUserSuccess, (state,action) => {
        state.loading = false;
        state.isUpdated = action.payload;
    })
    .addCase(updateUserFail, (state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(updateUserReset, (state) => {
        state.isUpdated = false;
    })
    .addCase(deleteUserRequest, (state) => {
        state.loading = true;
    })
    .addCase(deleteUserSuccess, (state,action) => {
        state.loading = false;
        state.isDeleted = action.payload.success;
        state.message = action.payload.message;
    })
    .addCase(deleteUserFail, (state,action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteUserReset, (state,action) => {
      state.isDeleted = false;
  })
    .addCase(clearError, (state) => {
        state.error = null;
    })
  }
);

export const forgotPasswordReducer = createReducer(
  {}, (builder) => {
    builder
      .addCase(forgotPasswordRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordSuccess, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPasswordFail, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotPasswordReset, (state, action) => {
        state.message = null;
      })
      .addCase(resetPasswordRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordSuccess, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(resetPasswordFail, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordReset, (state, action) => {
        state.success = null;
      })
      .addCase(clearError, (state) => {
        state.error = null;
      })
  }
);

export const allUsersReducer = createReducer(
  {users:[]}, (builder) => {
    builder
      .addCase(allUsersRequest, (state) => {
        state.loading = true;
      })
      .addCase(allUsersSuccess, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(allUsersFail, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearError, (state) => {
        state.error = null;
      })
  }
);

export const userDetailsReducer = createReducer(
  {user:{}}, (builder) => {
    builder
      .addCase(userDetailsRequest, (state) => {
        state.loading = true;
      })
      .addCase(userDetailsSuccess, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userDetailsFail, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearError, (state) => {
        state.error = null;
      })
  }
);