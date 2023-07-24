import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import cloudUploadFill from '@iconify/icons-eva/cloud-upload-outline';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
import axios from 'axios';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getListOfUsersAsync } from '../../redux/slices/userMSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_administrator/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'createdAt', label: 'Date', alignRight: false },
  { id: 'is_active', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(stabilizedThis, (_user) => _user[0].username.toLowerCase().indexOf(query.toLowerCase()) !== -1).map(
      (el) => el[0]
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { cashflowuser: userList } = useSelector((state) => state.flowusers);
  console.log('first,', userList);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(getListOfUsersAsync());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const title = 'User Management';

  /*eslint-disable*/
  return (
    <Page title={title}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={title}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.general.root },
            { name: 'User Management', href: PATH_DASHBOARD.admin.userManagement },
            { name: 'List' }
          ]}
          action={
            <>
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.admin.userCreate}
                startIcon={<Icon icon={plusFill} />}
              >
                New User
              </Button>{' '}
            </>
          }
        />

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            // onDelete={handleMultipleDelete}
            // onInactive={handleMultipleActive}
            // onActive={handleMultipleInActive}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  // orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, username, is_active, email, createdAt } = row;
                    const isItemSelected = selected.indexOf(id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        {/* <TableCell></TableCell> */}
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                        </TableCell> */}
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="left" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="left" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {username}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell>{`${String(createdAt).split('-')[2].slice(0, 2)}-${new Date(
                          createdAt
                        ).toLocaleString('en-us', { month: 'short' })}-${String(createdAt).split('-')[0]}`}</TableCell>
                        {/* <TableCell align="left">
                          {`${String(createdAt).split('-')[2].slice(0, 2)}/${String(createdAt).split('-')[1]}/${
                            String(createdAt).split('-')[0]
                          }`}
                        </TableCell> */}

                        {/* <TableCell align="left">
                          {roles.map(({ description }) => {
                            console.log('first', description);
                            return `${description}\n`;
                          })}
                        </TableCell> */}
                        <TableCell align="left">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(is_active === 'N' && 'error') || 'success'}
                          >
                            {is_active === 'Y' ? 'Active' : 'Inactive'}
                          </Label>
                        </TableCell>

                        {/* <TableCell align="right">
                          <UserMoreMenu username={username} />
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
