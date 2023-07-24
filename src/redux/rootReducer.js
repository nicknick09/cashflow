import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import flowusersReducer from './slices/userMSlice';
import organizenameReducer from './slices/ounameSlice';

// import timesheetReducer from './slices/timesheetSlice';
// import timesheetsettingsReducer from './slices/timesheetSettingsSlice';
// import timesheetapprovalReducer from './slices/timesheetApprovalSlice';
// import kpiKraReducer from './slices/kpiKraSlice';
// import leaveMasterReducer from './slices/leaveSlice';
// import overTimeAprovalReducer from './slices/overTimeApprovalSlice';
// import overTimeMasterReducer from './slices/overTimeMasterSlice';
// ----------------------------------------------------------------------

// const rootPersistConfig = {
//   key: 'root',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['auth']
// };

const authPersistConfig = {
  key: 'auth',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['isAuthenticated', 'userDetails', 'assetRefObj'],
  blacklist: ['isLoading']
};

const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['users', 'roles'],
  blacklist: ['isLoading', 'error']
};

// const timesheetSettingsPersistConfig = {
//   key: 'timesheetsettings',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['kkmasterDetails', 'groups'],
//   blacklist: ['isLoading', 'error']
// };

const resetpasswordPersistConfig = {
  key: 'resetpassword',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['kkmasterDetails', 'groups'],
  blacklist: ['isLoading', 'error']
};
const organizenamePersistConfig = {
  key: 'organizename',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['ounameList'],
  blacklist: ['isLoading', 'error']
};

const flowusersPersistConfig = {
  key: 'flowusers',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['cashflowuser'],
  blacklist: ['isLoading', 'error']
};
// const timesheetApprovalPersistConfig = {
//   key: 'timesheetApproval',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['data', 'approvalData', 'taskData', 'status', 'timesheetIdDetails'],
//   blacklist: ['isLoading', 'error']
// };

// const timesheetConfig = {
//   key: 'timesheet',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['selectedDate', 'status', 'category', 'project', 'data'],
//   blacklist: ['isLoading', 'error']
// };

// const leaveMasterConfig = {
//   key: 'leavemaster',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['countries'],
//   blacklist: ['isLoading', 'error']
// };

// const kpiKraPersistConfig = {
//   key: 'kpi',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['kpiKraSelfRating', 'kpiAndKraList', 'kpiKraManagerRating', 'kpiAndKraManagerList', 'groups'],
//   blacklist: ['isLoading', 'error']
// };

// const overTimeApprovalConfig = {
//   key: 'overTimeApproval',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['overTimeList', 'overTimeSingleList', 'overTimeDetails'],
//   blacklist: ['isLoading', 'error']
// };

// const overTimeMasterConfig = {
//   key: 'overTimeMaster',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['overTimeList', 'overTimeSingleList', 'overTimeDetails'],
//   blacklist: ['isLoading', 'error']
// };

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: persistReducer(userPersistConfig, userReducer),
  flowusers: persistReducer(flowusersPersistConfig, flowusersReducer),
  organizename: persistReducer(organizenamePersistConfig, organizenameReducer)

  // timesheet: persistReducer(timesheetConfig, timesheetReducer),
  // kpi: persistReducer(kpiKraPersistConfig, kpiKraReducer),
  // timesheetsettings: persistReducer(timesheetSettingsPersistConfig, timesheetsettingsReducer),

  // resetpassword: persistReducer(resetpasswordPersistConfig, timesheetsettingsReducer)

  // timesheetApproval: persistReducer(timesheetApprovalPersistConfig, timesheetapprovalReducer),
  // leaveMaster: persistReducer(leaveMasterConfig, leaveMasterReducer),
  // overTimeApproval: persistReducer(overTimeApprovalConfig, overTimeAprovalReducer),
  // overTimeMaster: persistReducer(overTimeMasterConfig, overTimeMasterReducer)
});

const reducers = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    storage.removeItem('redux-user');
    storage.removeItem('redux-flowusers');
    storage.removeItem('redux-organizename');
    storage.removeItem('redux-resetpassword');
    return rootReducer(undefined, action);
  }

  return rootReducer(state, action);
};

export { rootReducer, reducers };
