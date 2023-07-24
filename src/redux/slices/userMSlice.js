import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import fileSaver from '../../utils/fileSaver';

const initialState = {
  isLoading: false,
  msg: '',
  cashflowuser: [],
  error: ''
};

export const getListOfUsersAsync = createAsyncThunk(
  'flowusers/getListOfUsers',
  async (_payload, { rejectWithValue }) => {
    try {
      const response = await api.methods.getData(
        'https://techstephub.focusrtech.com:5050/CashForecasting/api/Users/Service/getListOfUsers'
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

const userSlice = createSlice({
  name: 'flowusers',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setErrorNull: (state, action) => {
      state.error = action.payload;
    },
    getUserList: (state) => {
      state.cashflowuser = [];
    },
    editUser: (state, action) => {
      state.editUser = action.payload;
    },
    setMsgNull: (state, action) => {
      state.msg = action.payload;
    }
  },

  extraReducers: {
    [getListOfUsersAsync.pending]: (state) => ({ ...state, isLoading: true }),
    [getListOfUsersAsync.fulfilled]: (state, action) => {
      console.log('Fetched Successfully!');
      return {
        ...state,
        cashflowuser: action.payload,
        isLoading: false
      };
    },
    [getListOfUsersAsync.rejected]: (state, action) => ({
      ...state,
      error: action.payload.message,
      isLoading: false
    })
  }
});

export default userSlice.reducer;
export const { startLoading, stopLoading, getUserList, setErrorNull, setMsgNull } = userSlice.actions;

// Selector
export const getIsLoadingFromUser = (state) => state.flowusers.isLoading;
export const getAllUsersListFromUser = (state) => state.flowusers.cashflowuser;
export const getErrorFromUser = (state) => state.flowusers.error;
export const getMsgFromUser = (state) => state.flowusers.msg;
