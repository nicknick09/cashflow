// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

export const ROOT_NAME = 'CashForecasting/';

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    root: path(ROOTS_DASHBOARD, '/metrics')
  },
  admin: {
    root: path(ROOTS_DASHBOARD, '/admin'),
    userManagement: path(ROOTS_DASHBOARD, '/admin/user-management'),
    userCreate: path(ROOTS_DASHBOARD, '/admin/user-management/user-create'),
    userEdit: path(ROOTS_DASHBOARD, '/admin/user-management/user-edit'),
    userBulkUpload: path(ROOTS_DASHBOARD, '/admin/user-management/user-bulkupload')
  },
  cashmanagement: {
    findInflow: path(ROOTS_DASHBOARD, '/cashmanagement/find-inflow'),
    inflowDetails: path(ROOTS_DASHBOARD, '/cashmanagement/find-inflow/inflow-details'),
    findOutflow: path(ROOTS_DASHBOARD, '/cashmanagement/find-outflow')
  },

  // timesheet: {
  //   root: path(ROOTS_DASHBOARD, '/timesheet'),
  //   timesheet: path(ROOTS_DASHBOARD, '/timesheet/timesheet-entry'),
  //   addTimesheet: path(ROOTS_DASHBOARD, '/timesheet/add-timesheet'),
  //   editTimesheet: path(ROOTS_DASHBOARD, '/timesheet/edit-timesheet'),
  //   reports: path(ROOTS_DASHBOARD, '/timesheet/reports'),
  //   approval: path(ROOTS_DASHBOARD, '/timesheet/approval'),
  //   approvalList: path(ROOTS_DASHBOARD, '/timesheet/approvalList'),
  //   leaveApproval: path(ROOTS_DASHBOARD, '/timesheet/timesheet-manager-leave-approval'),
  //   leaveAndOvertimeApplication: path(ROOTS_DASHBOARD, '/timesheet/timesheet-manager-leave-application'),
  //   settings: path(ROOTS_DASHBOARD, '/timesheet/timesheet-settings'),
  //   leaveMasterSettings: path(ROOTS_DASHBOARD, '/timesheet/leave-master-settings'),
  //   overtimeMasterSettings: path(ROOTS_DASHBOARD, '/timesheet/overtime-master-settings'),
  //   kpiKraSelfRating: path(ROOTS_DASHBOARD, '/timesheet/timesheet-kpi-kra-self-rating'),
  //   kpiKraManagerRating: path(ROOTS_DASHBOARD, '/timesheet/timesheet-kpi-kra-manager-rating'),
  //   kpiKraUserRatingList: path(ROOTS_DASHBOARD, '/timesheet/timesheet-kpi-kra-user-rating-list'),
  //   kpiKraConfigurations: path(ROOTS_DASHBOARD, '/timesheet/timesheet-kpi-kra-config'),
  //   kpiKraConfigurationsCreate: path(ROOTS_DASHBOARD, '/timesheet/timesheet-kpi-kra-config/create'),
  //   kpiKraConfigurationsEdit: path(ROOTS_DASHBOARD, '/timesheet/timesheet-kpi-kra-config/edit'),
  //   kpiKraMaster: path(ROOTS_DASHBOARD, '/timesheet/timesheet-kpi-kra-master'),
  //   kpiKraMasterCreate: path(ROOTS_DASHBOARD, '/timesheet/timesheet-kpi-kra-master/create'),
  //   kpiKraMasterEdit: path(ROOTS_DASHBOARD, '/timesheet/timesheet-kpi-kra-master/edit'),
  //   projectMaster: path(ROOTS_DASHBOARD, '/timesheet/timesheet-project-master'),
  //   projectMasterCreate: path(ROOTS_DASHBOARD, '/timesheet/timesheet-project-master/create'),
  //   projectMasterEdit: path(ROOTS_DASHBOARD, '/timesheet/timesheet-project-master/edit'),
  //   timesheetUserConfigurations: path(ROOTS_DASHBOARD, '/timesheet/timesheet-user-settings'),
  //   timesheetUserConfigurationsUpdate: path(ROOTS_DASHBOARD, '/timesheet/timesheet-user-settings/update'),
  //   overTime: path(ROOTS_DASHBOARD, '/timesheet/overtime-entry'),
  //   overTimeApproval: path(ROOTS_DASHBOARD, '/timesheet/overtime-approval'),
  //   leaveEntry: path(ROOTS_DASHBOARD, '/timesheet/leave-entry'),
  //   overTimeApprovalList: path(ROOTS_DASHBOARD, '/timesheet/overTime-approvalList'),
  //   timeSheetBulkUpload: path(ROOTS_DASHBOARD, '/timesheet/timesheet-entry/bulk-upload')
  // },

  // managers: {
  //   root: path(ROOTS_DASHBOARD, '/managers'),
  //   managersTaskList: path(ROOTS_DASHBOARD, '/managers/managers-task-list')
  // },

  changePassword: {
    changePassword: path(ROOTS_DASHBOARD, '/changePassword')
  }
};

// ------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  resetPasswordPage: path(ROOTS_AUTH, '/updateNewPassword'),
  verify: path(ROOTS_AUTH, '/verify'),
  assetCapture: path(ROOTS_AUTH, '/asset-capture')
};
