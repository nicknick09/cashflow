import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik, Field } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { LoadingButton } from '@mui/lab';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  Container,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  InputAdornment,
  Switch,
  FormControlLabel
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import closeFill from '@iconify/icons-eva/close-fill';
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from '../../utils/characters';
import { fData } from '../../utils/formatNumber';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import { PATH_DASHBOARD } from '../../routes/paths';
import { UploadAvatar } from '../../components/upload';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  updateUserActionAsync,
  getIsLoadingFromUser,
  getRolesListFromUser,
  userActiveInactiveActionAsync,
  getAllManagersActionAsync,
  getManagersListFromUser,
  getListOfDesignationActionAsync,
  getDesignationsListFromUser,
  getErrorFromUser,
  setErrorNull,
  getMsgFromUser,
  setMsgNull
} from '../../redux/slices/userSlice';
// import { getAllGroupsAsync, getAllUsersFromGroups } from '../../redux/slices/timesheetSettingsSlice';
import { MIconButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

/**
 * TODO Intergrate with service donot use this
 */

/*eslint-disable*/

const createPassword = (characterList) => {
  let password = '';
  const characterListLength = characterList.length;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    const characterIndex = Math.round(Math.random() * characterListLength);
    password += characterList.charAt(characterIndex);
  }
  return password;
};

export default function UserEdit() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const params = useParams();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Role, setRole] = useState('');
  const roles = useSelector(getRolesListFromUser);
  const [check, setCheck] = useState(false);
  const [dateCreated, setDateCreated] = useState('');
  const isLoading = useSelector(getIsLoadingFromUser);
  const managers = useSelector(getManagersListFromUser);
  // const groups = useSelector(getAllUsersFromGroups);
  const designations = useSelector(getDesignationsListFromUser);
  const { users } = useSelector((state) => state.user);
  const error = useSelector(getErrorFromUser);
  const msg = useSelector(getMsgFromUser);

  /**
   * Get user from array
   */
  const userDetails = users.find((_x) => _x.employeeId === params.employeeId);
  // const [selectedDesignation, setSelectedDesignation] = useState({ designation: userDetails.designation } || null);
  // const [checked, setChecked] = useState(false || userDetails.isActive === 'Y');
  // const [isBulkChecked, setisBulkChecked] = useState(false || userDetails.is_bulk_upload === 'Y');
  const [dateFreeze, setDateFreeze] = useState('');
  const getRole = (role) => (roles.length > 0 ? roles.find((_x) => _x.id === role).name : '');

  const title = 'User Management';

  const NewUserSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Must be greater than 5 letters')
      .max(21, 'Must be lesser than 20 letters'),
    username: Yup.string().required('Username is required'),
    userRoles: Yup.string().required('Role is required'),
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Must be greater than 4 letters')
      .max(41, 'Must be lesser than 40 letters'),
    employeeId: Yup.string().required('Employee id is required')
    // reportingManager: Yup.string().required('Reporting Manager is required'),
    // group: Yup.number().required('KPI-KRa Group is required'),
    // designation: Yup.string().required('Designation is required'),
    // is_bulk_upload: Yup.string(),
    // date_freeze: Yup.string()
    // avatarUrl: Yup.mixed().required('Avatar is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // This is old used
      // name: userDetails.name || '',
      // email: userDetails.email || '',
      // password: userDetails.password || '',
      // username: userDetails.username || '',
      // userRoles: getRole(userDetails.roleId) || '',
      // employeeId: userDetails.employeeId || ''

      // Currently used this
      id: '',
      name: '',
      username: '',
      email: '',
      password: '',
      userRoles: ''

      // avatarUrl: userDetails.avatarUrl || '',
      // designation: userDetails.designation || '',
      // reportingManager: userDetails.managerId || '',
      // group: userDetails.groupId || '',
      // is_bulk_upload: userDetails.is_bulk_upload || '',
      // date_freeze: userDetails.date_freeze || ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const payload = {
          ...values,
          id: userDetails.id,
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
          userRoles: values.userRoles

          // group_id: values.group,
          // managerId: values.reportingManager,

          // is_bulk_upload: isBulkChecked ? 'Y' : 'N',
          // date_freeze: dateFreeze
        };
        await dispatch(updateUserActionAsync(payload));
        // await dispatch(getAllManagersActionAsync());
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleUserActiveInactive = (event) => {
    const payload = {
      id: userDetails.id,
      is_Active: event.target.checked ? 'Y' : 'N'
    };
    setChecked(event.target.checked);
    dispatch(userActiveInactiveActionAsync(payload));
  };

  // const handleBulkUpload = (event) => {
  //   setisBulkChecked(event.target.checked);
  // };

  // const handleChangeDateFreeze = (e) => {
  //   setDateFreeze(e.target.value);
  // };

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea');
    newTextArea.innerText = values.password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand('copy');
    newTextArea.remove();
  };

  const handleCopyPassword = () => {
    if (values.password === '') {
      enqueueSnackbar('Nothing to copied', {
        variant: 'error'
      });
    } else {
      copyToClipboard();
      enqueueSnackbar('Copied!', {
        variant: 'success'
      });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  useEffect(() => {
    setFieldValue('password', createPassword(numbers + upperCaseLetters + lowerCaseLetters + specialCharacters));
    // setDateFreeze(userDetails.date_freeze);
    // dispatch(getAllManagersActionAsync());
    // dispatch(getListOfDesignationActionAsync());
    // dispatch(getAllGroupsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, setFieldValue]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      dispatch(setErrorNull());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // useEffect(() => {
  //   if (msg) {
  //     enqueueSnackbar(msg, { variant: 'success' });
  //     dispatch(setMsgNull());
  //     // setSelectedDesignation('');
  //     // setFieldValue('designation', '');
  //     // resetForm();
  //     // setFieldValue('is_bulk_upload', false);
  //     // setFieldValue('designation', '');
  //     setFieldValue('password', createPassword(numbers + upperCaseLetters + lowerCaseLetters + specialCharacters));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [msg]);

  useEffect(() => {
    //   if (msg) {
    //     enqueueSnackbar(msg, { variant: 'success' });
    //     dispatch(setMsgNull());

    //     setFieldValue('userRoles', 'ADMIN');
    //     setFieldValue('username', '');
    //     setFieldValue('effective_start_date', '');
    //     setFieldValue('effective_end_date', '');
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [msg]);
    axios
      .get('https://techstephub.focusrtech.com:5050/CashForecasting/api/Users/Service/getListOfUsers', {
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line prefer-template
          Authorization: 'Bearer ' + token
        }
      })
      .then((res) => {
        console.log('this is response data', res.data);
        // console.log('for person id', res.data[0].person_id);
        // setEmployeeID(res.data[0].person_id);
        // setStartDate(res.data[0].effective_start_date);
        // setEndDate(res.data[0].effective_end_date);
        // setFullName(searchParams.fullname);
        console.log('this is fullname from params', params);

        const newArr = res.data.filter((val) => {
          return val.username === params.username;
          [0];
        });
        const userDetails = res.data.find((_x) => _x.username === Number(params.username));

        console.log('98', userDetails);

        console.log('6789', newArr[0].username);

        setUserName(params.username);
        setName(newAr[0].name);
        setDateCreated(newAr[0].createdAt);
        setRole(newAr[0].roles[0].name);
        setEmail(newAr[0].email);
        setId(newAr[0].id);
        if (newAr[0].is_active === 'Y') {
          setCheck(true);
        } else if (newAr[0].is_active === 'N') {
          setCheck(false);
        }

        var pass = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';

        for (let i = 1; i <= 8; i++) {
          var char = Math.floor(Math.random() * str.length + 1);

          pass += str.charAt(char);
        }

        return setPassword(pass);
      })
      .catch((err) => {
        console.log('Error', err);
      });

    console.log('local stroage', JSON.parse(localStorage.getItem('Details')));
  }, []);

  const token = localStorage.getItem('accessToken');

  const sendData = () => {
    // const date = new Date();
    axios
      .post(
        'https://techstephub.focusrtech.com:5050/CashForecasting/api/Users/Service/deleteUser',
        {
          id: Number(id),
          is_Active: check ? 'Y' : 'N'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // eslint-disable-next-line prefer-template
            Authorization: 'Bearer ' + token
          }
        }
      )
      .then((res) => {
        console.log(' active or inactive sended successfully', res.status);

        axios
          .put(
            'https://techstephub.focusrtech.com:5050/CashForecasting/api/Users/Service/updateUserDetails',
            {
              id: String(id),
              name: String(name),
              username: String(userName),
              // empid: String(empId),
              email: String(Email),
              // effective_start_date: startDate,
              // effective_end_date: endDate,

              password: String(password),
              userRoles: String(Role)
            },
            {
              headers: {
                'Content-Type': 'application/json',
                // eslint-disable-next-line prefer-template
                Authorization: 'Bearer ' + token
              }
            }
          )
          .then((res) => {
            console.log('update user sended successfully', res.status);
            enqueueSnackbar('User Details Updated Successfully', {
              autoHideDuration: 6000,
              variant: 'success'
            });
            // setSuccess(true);
          })
          .catch((er) => {
            console.log('error accquired', er);
          });
        setSuccess(true);
        console.log('data', Date(startDate));
        navigate(PATH_DASHBOARD.admin.userManagement);
      })
      .catch((er) => {
        console.log('error accquired', er);
      });
  };

  return (
    <Page title={title}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={title}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User Management', href: PATH_DASHBOARD.admin.userManagement },
            { name: 'User Edit' }
          ]}
        />
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3} alignself="center">
              {/* <Grid item xs={12} md={12}>
                <Card sx={{ py: 10, px: 3 }}>
                  <Box sx={{ mb: 5 }}>
                    <UploadAvatar
                      accept="image/*"
                      file={values.avatarUrl}
                      maxSize={3145728}
                      onDrop={handleDrop}
                      error={Boolean(touched.avatarUrl && errors.avatarUrl)}
                      caption={
                        <Typography
                          variant="caption"
                          sx={{
                            mt: 2,
                            mx: 'auto',
                            display: 'block',
                            textAlign: 'center',
                            color: 'text.secondary'
                          }}
                        >
                          Allowed *.jpeg, *.jpg, *.png, *.gif
                          <br /> max size of {fData(3145728)}
                        </Typography>
                      }
                    />
                    <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                      {touched.avatarUrl && errors.avatarUrl}
                    </FormHelperText>
                  </Box>
                </Card>
              </Grid> */}

              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                      <FormControl fullWidth error={Boolean(touched.fullname && errors.fullname)}>
                        {/* <InputLabel id="fullname-id-label">Employee Name</InputLabel>
                        <Select
                          labelId="fullname-id-label"
                          id="fullname-id"
                          label="Employee Name"
                          value={userName}
                          filter
                          MenuProps={MenuProps}
                          onChange={(e) => {
                            setUserName(e.target.value);
                            console.log('first', e.target.value);
                            detailsGetFromFullname(e.target.value);
                            getApiData(e.target.value);
                          }}
                        >
                          {fullName.map((_x, i) => (
                            <MenuItem key={i} value={_x.name}>
                              {_x.name}
                            </MenuItem>
                          ))}
                        </Select> */}
                        <div className="card flex justify-content-center" style={{ width: '100%' }}>
                          <FormControl fullWidth>
                            <TextField
                              sx={{
                                width: '100%'
                              }}
                              value={name}
                              label="Fullname"
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Fullname"
                            />
                          </FormControl>
                        </div>
                      </FormControl>

                      <TextField
                        sx={{
                          width: '100%'
                        }}
                        value={userName}
                        label="Username"
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                      />

                      <FormControl fullWidth>
                        <InputLabel id="role-id-label">Role</InputLabel>

                        <Select
                          // sx={{ width: 420 }}
                          fullWidth
                          labelId="role-id-label"
                          id="role-id"
                          label="Role"
                          value={Role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                          <MenuItem value="ROLE_USER">User</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                      <TextField
                        sx={{
                          width: '50%'
                        }}
                        value={Email}
                        label="Email Id"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email id"
                      />
                      <TextField
                        sx={{
                          width: '50%'
                        }}
                        autoComplete="new-password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleShowPassword} edge="end">
                                <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                              </IconButton>{' '}
                              <IconButton onClick={handleCopyPassword} edge="end">
                                <ContentCopyIcon />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      <Switch checked={check} onChange={() => setCheck(!check)} />
                      <p
                        style={{
                          textAlign: 'center',
                          alignSelf: 'baseline',
                          marginTop: '5%',
                          fontWeight: 'bold',
                          color: check ? 'green' : 'red'
                        }}
                      >
                        {check ? 'Active' : 'In Active'}
                      </p>
                    </Stack>

                    {/* here ending */}

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isSubmitting || isLoading}
                        onClick={sendData}
                      >
                        Update User
                      </LoadingButton>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}
