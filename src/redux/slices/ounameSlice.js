import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import fileSaver from '../../utils/fileSaver';

const initialState = {
  isLoading: false,
  msg: '',
  ounameList: [],
  error: ''
};

export const operatingUnitAsync = createAsyncThunk(
  'organizename/operating_unit',
  async (_payload, { rejectWithValue }) => {
    try {
      const response = await api.methods.getData(
        'https://techstephub.focusrtech.com:5050/CashForecasting/api/operating_unit/name'
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

const userSlice = createSlice({
  name: 'organizename',
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
      state.ounameList = [];
    },
    editUser: (state, action) => {
      state.editUser = action.payload;
    },
    setMsgNull: (state, action) => {
      state.msg = action.payload;
    }
  },

  extraReducers: {
    [operatingUnitAsync.pending]: (state) => ({ ...state, isLoading: true }),
    [operatingUnitAsync.fulfilled]: (state, action) => {
      console.log('Fetched Successfully!');
      return {
        ...state,
        ounameList: action.payload,
        isLoading: false
      };
    },
    [operatingUnitAsync.rejected]: (state, action) => ({
      ...state,
      error: action.payload.message,
      isLoading: false
    })
  }
});

export default userSlice.reducer;
export const { startLoading, stopLoading, getUserList, setErrorNull, setMsgNull } = userSlice.actions;

// Selector
export const getIsLoadingFromUser = (state) => state.organizename.isLoading;
export const getUsersOunameFromUser = (state) => state.organizename.ounameList;
export const getErrorFromUser = (state) => state.organizename.error;
export const getMsgFromUser = (state) => state.organizename.msg;
