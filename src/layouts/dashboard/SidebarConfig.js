import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`${process.env.PUBLIC_URL}/static/icons/navbar/${name}.svg`}
    sx={{ width: '100%', height: '100%' }}
  />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  users: getIcon('ic_kanban')
  // handlingfinance: getIcon('ic_handlingfinance')
};

export const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [{ title: 'dashboard', path: PATH_DASHBOARD.general.root, icon: ICONS.dashboard }]
  },

  // USER MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'administrator',
    items: [
      {
        title: 'user management',
        path: PATH_DASHBOARD.admin.root,
        icon: ICONS.user,
        children: [{ title: 'Users', path: PATH_DASHBOARD.admin.userManagement }]
      }
    ]
  },
  {
    subheader: 'cashmanagement',
    items: [
      {
        title: 'Handling Finance',
        path: PATH_DASHBOARD.cashmanagement.root,
        // icon: <PendingActionsTwoToneIcon />,
        icon: <MonetizationOnTwoToneIcon />,
        children: [
          { title: 'FindInflow', path: PATH_DASHBOARD.cashmanagement.findInflow },
          { title: 'FindOutflow', path: PATH_DASHBOARD.cashmanagement.findOutflow }
        ]
      }
    ]
  }

  // TIMESHEET MANAGEMENT
  //-------------------------------------------------------------------------
  // {
  //   subheader: 'timesheet',
  //   items: [
  //     {
  //       title: 'timesheet',
  //       path: PATH_DASHBOARD.timesheet.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Entry', path: PATH_DASHBOARD.timesheet.timesheet },
  //         { title: 'Reports', path: PATH_DASHBOARD.timesheet.reports },
  //         { title: 'KPI-KRA', path: PATH_DASHBOARD.timesheet.kpiKraSelfRating },
  //         { title: 'KPI-KRA Approval', path: PATH_DASHBOARD.timesheet.kpiKraManagerRating },
  //         { title: 'Timesheet Approval', path: PATH_DASHBOARD.timesheet.approval },
  //         // { title: 'Leave', path: PATH_DASHBOARD.timesheet.leaveAndOvertimeApplication },
  //         // { title: 'Leave Approval', path: PATH_DASHBOARD.timesheet.leaveApproval },
  //         // { title: 'Over Time Entry', path: PATH_DASHBOARD.timesheet.overTime },
  //         // { title: 'Over Time Approval', path: PATH_DASHBOARD.timesheet.overTimeApproval },
  //         { title: 'settings', path: PATH_DASHBOARD.timesheet.settings }
  //       ]
  //     }
  //   ]
  // },

  // MANAGERS APP

  // {
  //   subheader: 'managers',
  //   items: [{ title: 'Overview', path: PATH_DASHBOARD.managers.managersTaskList }]
  // }
];

export const userSidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [{ title: 'dashboard', path: PATH_DASHBOARD.general.root, icon: ICONS.dashboard }]
  }
  // TIMESHEET MANAGEMENT
  //-------------------------------------------------------------------------
  // {
  //   subheader: 'timesheet',
  //   items: [
  //     {
  //       title: 'timesheet',
  //       path: PATH_DASHBOARD.timesheet.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Entry', path: PATH_DASHBOARD.timesheet.timesheet },
  //         { title: 'KPI-KRA', path: PATH_DASHBOARD.timesheet.kpiKraSelfRating },
  //         { title: 'Reports', path: PATH_DASHBOARD.timesheet.reports }
  //         { title: 'Leave', path: PATH_DASHBOARD.timesheet.leaveAndOvertimeApplication },
  //         { title: 'Over Time Entry', path: PATH_DASHBOARD.timesheet.overTime }
  //       ]
  //     }
  //   ]
  // }
];
