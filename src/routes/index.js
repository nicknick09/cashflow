import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
import ResetPassword from '../pages/authentication/ResetPassword';
import VerifyCode from '../pages/authentication/VerifyCode';
import Login from '../pages/authentication/Login';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
import DashboardLayout from '../layouts/dashboard';
import Password from '../pages/ResetPasswordPage/Password';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes(
    [
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            element: <Login />
          },
          { path: 'reset-password', element: <ResetPassword /> },
          { path: 'verify', element: <VerifyCode /> },
          { path: `updateNewPassword/:token`, element: <Password /> }
          // { path: 'asset-capture', element: <AssetCaptureScreen /> }
        ]
      },

      // Dashboard Routes
      {
        path: 'dashboard',
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ),
        children: [
          { path: 'metrics', element: <Metrics /> },
          { path: 'changePassword', element: <ChangePassword /> },
          {
            path: 'admin',
            children: [
              { element: <Navigate to="/dashboard/admin/user-management" replace /> },
              {
                path: 'user-management',
                element: (
                  <RoleBasedGuard accessibleRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}>
                    <UserManagement />
                  </RoleBasedGuard>
                )
              },
              { path: 'user-management/user-create', element: <UserCreate /> },
              { path: 'user-management/user-edit/:employeeId', element: <UserEdit /> },
              { path: 'user-management/user-bulkupload', element: <UserBulkupload /> }
            ]
          },

          {
            path: 'cashmanagement',
            children: [
              { element: <Navigate to="/dashboard/cashmanagement/find-inflow" replace /> },
              {
                path: 'find-inflow',
                element: <FindInFlow />
              },
              {
                path: 'find-inflow/inflow-details',
                element: <InflowDetails />
              },
              {
                path: 'find-outflow',
                element: <FindOutflow />
              }
            ]
          }
          // {
          //   path: 'timesheet',
          //   children: [
          //     { element: <Navigate to="/dashboard/timesheet/timesheet-entry" replace /> },
          //     { path: 'timesheet-entry', element: <TimesheetEntry /> },
          //     { path: 'add-timesheet', element: <AddTimesheet /> },
          //     { path: 'edit-timesheet', element: <EditTimesheet /> },
          //     { path: 'reports', element: <Reports /> },
          //     { path: 'approval', element: <Approval /> },
          //     { path: 'approvalList', element: <TSApprovalList /> },
          //     { path: 'timesheet-manager-leave-approval', element: <LeaveApproval /> },
          //     { path: 'timesheet-manager-leave-application', element: <LeaveAndOvertimeApplication /> },
          //     { path: 'timesheet-kpi-kra-self-rating', element: <KpiKraSelfRating /> },
          //     { path: 'timesheet-kpi-kra-manager-rating', element: <KpiKraManagerRating /> },
          //     { path: 'timesheet-kpi-kra-user-rating-list/:kpiKraId', element: <KpiKraUserRatingList /> },
          //     { path: 'timesheet-settings', element: <Settings /> },
          //     { path: 'leave-master-settings', element: <LeaveSettings /> },
          //     { path: 'overtime-master-settings', element: <OvertimeSettings /> },
          //     { path: 'timesheet-kpi-kra-config', element: <KpiKraConfigurations /> },
          //     {
          //       path: 'timesheet-kpi-kra-master',
          //       element: <KpiKraMaster />
          //     },
          //     {
          //       path: 'timesheet-user-settings',
          //       element: <TimesheetUserConfigurations />
          //     },
          //     {
          //       path: 'timesheet-user-settings/update/:employeeId',
          //       element: <TimesheetUserConfigurationsEdit />
          //     },
          //     { path: 'timesheet-kpi-kra-master/create', element: <KpiKraMasterCreate /> },
          //     { path: 'timesheet-kpi-kra-master/edit/:id', element: <KpiKraMasterEdit /> },
          //     { path: 'timesheet-project-master', element: <ProjectMaster /> },
          //     { path: 'timesheet-project-master/create', element: <ProjectMasterCreate /> },
          //     { path: 'timesheet-project-master/edit/:id', element: <ProjectMasterEdit /> },
          //     { path: 'overtime-entry', element: <OverTime /> },
          //     { path: 'overtime-approval', element: <OverTimeApproval /> },
          //     { path: 'leave-entry', element: <LeaveEntry /> },
          //     { path: 'overtime-approvalList', element: <OverTimeApprovalList /> },
          //     { path: 'timesheet-entry/bulk-upload', element: <TimesheetBulkUpload /> }
          //   ]
          // },
          // {
          //   path: 'managers',
          //   children: [
          //     { element: <Navigate to="/dashboard/managers/managers-task-list" replace /> },
          //     { path: 'managers-task-list', element: <ManagersTaskList /> }
          //   ]
          // }
        ]
      },

      // Main Routes
      {
        path: '*',
        element: <LogoOnlyLayout />,
        children: [
          { path: '404', element: <NotFound /> },
          { path: '500', element: <ServerError /> },
          { path: '*', element: <Navigate to="/404" replace /> }
        ]
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [{ element: <LandingPage /> }]
      },
      { path: '*', element: <Navigate to="/404" replace /> }
    ],
    { basename: 'CashForecasting' }
  );
}

// IMPORT COMPONENTS

// Dashboard

// const TimesheetEntry = Loadable(lazy(() => import('../pages/timesheet/TimesheetEntryScreen')));
// const AddTimesheet = Loadable(lazy(() => import('../pages/timesheet/AddTimesheet')));
// const EditTimesheet = Loadable(lazy(() => import('../pages/timesheet/EditTimesheet')));
const UserManagement = Loadable(lazy(() => import('../pages/administrator/UserManagement')));
const UserCreate = Loadable(lazy(() => import('../pages/administrator/UserCreate')));
const UserEdit = Loadable(lazy(() => import('../pages/administrator/UserEdit')));
const UserBulkupload = Loadable(lazy(() => import('../pages/administrator/UserBulkupload')));
const NotFound = Loadable(lazy(() => import('../pages/errors/Page404')));
const ServerError = Loadable(lazy(() => import('../pages/errors/Page500')));

// const Reports = Loadable(lazy(() => import('../pages/timesheetreports/Reports')));
// const Settings = Loadable(lazy(() => import('../pages/timesheetsettings/TimesheetSettings')));
// const LeaveSettings = Loadable(lazy(() => import('../pages/timesheetsettings/LeaveMaster')));
// const OvertimeSettings = Loadable(
//   lazy(() => import('../pages/timesheetsettings/OvertimeMasterComponents/OvertimeMaster'))
// );
// const KpiKraSelfRating = Loadable(lazy(() => import('../pages/timesheet/KpiKraSelfRating')));
// const KpiKraUserRatingList = Loadable(
//   lazy(() => import('../pages/approval/KpiKraManagerRatingComponents/KpiKraUserRatingList'))
// );
// const KpiKraManagerRating = Loadable(lazy(() => import('../pages/approval/KpiKraManagerRating')));
// const KpiKraConfigurations = Loadable(lazy(() => import('../pages/timesheetsettings/KpiKraConfiguration')));
// const KpiKraMaster = Loadable(lazy(() => import('../pages/timesheetsettings/KpiKraMaster')));
// const KpiKraMasterCreate = Loadable(
//   lazy(() => import('../pages/timesheetsettings/kpi-kra-master-components/KpiKraMasterCreate'))
// );
// const KpiKraMasterEdit = Loadable(
//   lazy(() => import('../pages/timesheetsettings/kpi-kra-master-components/KpiKraMasterEdit'))
// );
// const ProjectMaster = Loadable(lazy(() => import('../pages/timesheetsettings/ProjectMaster')));
// const ProjectMasterCreate = Loadable(
//   lazy(() => import('../pages/timesheetsettings/ProjectMasterComponents/ProjectMasterCreate'))
// );
// const ProjectMasterEdit = Loadable(
//   lazy(() => import('../pages/timesheetsettings/ProjectMasterComponents/ProjectMasterEdit'))
// );

//  need to check

// const TimesheetUserConfigurations = Loadable(
//   lazy(() => import('../pages/timesheetsettings/TimesheetUserConfigurations'))
// );
// const TimesheetUserConfigurationsEdit = Loadable(
//   lazy(() => import('../pages/timesheetsettings/timesheet-user-configurations-components/TimesheetUserUpdateDetails'))
// );

// const OverTime = Loadable(lazy(() => import('../pages/overtime/OverTime')));
// const OverTimeApproval = Loadable(lazy(() => import('../pages/overtime/OverTimeApproval')));
// const LeaveEntry = Loadable(lazy(() => import('../pages/timesheet/LeaveEntry')));
// const LeaveApproval = Loadable(lazy(() => import('../pages/approval/LeaveApproval')));
// const LeaveAndOvertimeApplication = Loadable(lazy(() => import('../pages/timesheet/LeaveAndOverTimeApplication')));
// const Approval = Loadable(lazy(() => import('../pages/approval/TimesheetApproval')));
// const TSApprovalList = Loadable(lazy(() => import('../pages/approval/TSApprovalList')));
const Metrics = Loadable(lazy(() => import('../pages/general/Metrics')));
const ChangePassword = Loadable(lazy(() => import('../pages/ResetPasswordPage/ChangePassword')));

// const OverTimeApprovalList = Loadable(lazy(() => import('../pages/overtime/OverTimeApprovalList')));
// const TimesheetBulkUpload = Loadable(lazy(() => import('../pages/timesheet/TimesheetBulkUpload')));
// const AssetCaptureScreen = Loadable(lazy(() => import('../pages/assetmanagement/AssetCapture/AssetCapture')));

// Main
const LandingPage = Loadable(lazy(() => import('../pages/home/LandingPage')));

// Managers
// const ManagersTaskList = Loadable(lazy(() => import('../pages/managers/TaskList')));

// Cash Management

const FindInFlow = Loadable(lazy(() => import('../pages/cashmanagement/FindInflow')));
const InflowDetails = Loadable(lazy(() => import('../pages/cashmanagement/InflowDetails')));

const FindOutflow = Loadable(lazy(() => import('../pages/cashmanagement/FindOutflow')));
