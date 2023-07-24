import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik, Field } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { LoadingButton } from '@mui/lab';
// import { Dropdown } from 'primereact/dropdown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { MultiSelect } from 'primereact/multiselect';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
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
  FormControlLabel,
  Alert,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { DatePicker } from '@mui/lab';
import { format } from 'date-fns';
import closeFill from '@iconify/icons-eva/close-fill';
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from '../../utils/characters';
import { fData } from '../../utils/formatNumber';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import { PATH_DASHBOARD } from '../../routes/paths';
import { UploadAvatar } from '../../components/upload';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  createUserActionAsync,
  // getRolesListFromUser,
  // getListofAllNamesAsync,
  // getIsLoadingFromUser,
  // getManagersListFromUser,
  // getNameListFromUser,
  // getRoleListFromUser,
  // getListOfRolesAsync,
  // getListOfDesignationActionAsync,
  // getAllFullNameActionQueryAsync,
  getErrorFromUser,
  setErrorNull,
  getMsgFromUser,
  setMsgNull
} from '../../redux/slices/userSlice';
import { MIconButton } from '../../components/@material-extend';
// import ErrorCustom from '../error/Customerror';

// ----------------------------------------------------------------------

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function UserCreate() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { themeStretch } = useSettings();
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(null);
  const [end, setEnd] = useState(null);

  const [fullNames, setFullName] = useState('');
  const [empId, setEmployeeID] = useState('');
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [Role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [Email, setEmail] = useState('');
  const [Salert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [Loading, setLoading] = useState(false);
  // const fullName = useSelector(getNameListFromUser);
  // console.log('first', fullName);
  // const roleUser = useSelector(getRoleListFromUser);
  // console.log('Second', roleUser);
  // const error = useSelector(getErrorFromUser);
  // const isLoading = useSelector(getIsLoadingFromUser);
  const msg = useSelector(getMsgFromUser);

  const title = 'User Management';

  const NewUserSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Must be greater than 5 letters')
      .max(21, 'Must be lesser than 20 letters'),
    username: Yup.string().required('Username is required'),
    userRoles: Yup.string().required('Role is required'),
    empId: Yup.string().required('Employee id is required')
  });

  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: '',
      name: '',
      email: '',
      password: '',
      userRoles: '',
      effective_start_date: ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const payload = {
          ...values,
          empid: values.empid,
          effective_start_date: values.effective_start_date,
          effective_end_date: values.effective_end_date
        };
        await dispatch(createUserActionAsync(payload));

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

  // useEffect(() => {
  //   setFieldValue('password', createPassword(numbers + upperCaseLetters + lowerCaseLetters + specialCharacters));
  //   dispatch(getAllRolesActionAsync());
  //   dispatch(getAllFullNameActionAsync());
  //   dispatch(getAllFullNameActionQueryAsync());

  //   console.log('full name api', fullName);
  // }, []);
  // useEffect(() => {
  //   setFieldValue('password', createPassword(numbers + upperCaseLetters + lowerCaseLetters + specialCharacters));
  //   dispatch(getListofAllNamesAsync());
  //   dispatch(getListOfRolesAsync());
  //   dispatch(getListOfDesignationActionAsync());
  //   dispatch(getAllFullNameActionQueryAsync());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   console.log('full name api', fullName);
  // }, []);

  // useEffect(() => {
  //   if (error) {
  //     enqueueSnackbar(error, {
  //       variant: 'error',
  //       action: (key) => (
  //         <MIconButton size="small" onClick={() => closeSnackbar(key)}>
  //           <Icon icon={closeFill} />
  //         </MIconButton>
  //       )
  //     });
  //     dispatch(setErrorNull());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [error]);

  useEffect(() => {
    if (msg) {
      enqueueSnackbar(msg, { variant: 'success' });
      dispatch(setMsgNull());

      setFieldValue('userRoles', 'ADMIN');
      setFieldValue('username', '');
      setFieldValue('effective_start_date', '');
      setFieldValue('effective_end_date', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg]);

  const detailsGetFromFullname = (h) => {
    console.log('check the query', h);
  };

  /*eslint-disable*/

  const token = localStorage.getItem('accessToken');

  const sendData = () => {
    if (name == '' || userName == '' || password == '' || Email == '' || Role == '') {
      setAlert(true);
      console.log('Semd ', sendData);
    } else {
      axios
        .post(
          'https://techstephub.focusrtech.com:5050/CashForecasting/api/auth/signup',
          {
            name: String(name),
            username: String(userName),
            email: String(Email),
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
          console.log('Ok', res.data);
          enqueueSnackbar('User Created Successfully', {
            autoHideDuration: 6000,
            variant: 'success'
          });

          setSuccess(true);
          console.log('response status', res.status);
          navigate(PATH_DASHBOARD.admin.userManagement);
        })
        .catch((er) => {
          console.log('error accquired', er.response.data.message);
          enqueueSnackbar(er.response.data.message, {
            autoHideDuration: 6000,
            variant: 'error'
          });
          console.log('new error', er);
        });
      const details = [];
      details[0] = password;
      details[1] = userName;
      localStorage.setItem('Details', JSON.stringify(details));
    }
  };

  return (
    <Page title={title}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={title}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.general.root },
            {
              name: 'User Management',
              href: PATH_DASHBOARD.admin.userManagement
            },
            { name: 'User Create' }
          ]}
        />
        {Loading ? (
          <div
            style={{
              width: '100%',
              height: '100vh',
              backgroundColor: '#fff'
            }}
          >
            <h1>Loading....</h1>
          </div>
        ) : null}
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3} alignself="center">
              {/* <Snackbar
                sx={{
                  width: '30vw'
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Salert}
                autoHideDuration={5000}
                onClose={() => setAlert(false)}
              >
                <Alert
                  sx={{
                    width: '100%'
                  }}
                  severity="error"
                >
                  Please fill all fields
                </Alert>
              </Snackbar> */}

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
                            {/* <Select
                              // style={{ width: 840, height: 55 }}
                              // fullWidth
                              // // options={fullName}
                              // optionLabel="value"
                              // optionValue="value"
                              // filter
                              // placeholder="Employee Name"
                              labelId="full-name-label"
                              id="full-name"
                              label="Fullname"
                              // value={Role}
                              // maxSelectedLabels={1}

                              // {...getFieldProps('empNames')}
                              // className="w-full"
                              onChange={(e) => {
                                setUserName(e.target.value);
                                console.log('first', e.target.value);
                                detailsGetFromFullname(e.target.value);
                                getApiData(e.target.value);
                              }}
                            /> */}

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
                        {/* <FormHelperText>
                          {userName === '' ? (
                            <p
                              style={{
                                color: '#b71c1c'
                              }}
                            >{`User Name ${ErrorCustom.Required}`}</p>
                          ) : null}
                        </FormHelperText> */}
                      </FormControl>
                      <TextField
                        sx={{
                          width: '100%'
                        }}
                        value={userName}
                        label="Username"
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                        // helperText={
                        //   Email === '' ? (
                        //     <p
                        //       style={{
                        //         color: '#b71c1c'
                        //       }}
                        //     >
                        //       {`Emp Id ${ErrorCustom.Required}`}
                        //     </p>
                        //   ) : null
                        // }
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
                        {/* <FormHelperText>
                          {Role === '' ? (
                            <p
                              style={{
                                color: '#b71c1c'
                              }}
                            >
                              {`Role ${ErrorCustom.Required}`}
                            </p>
                          ) : null}
                        </FormHelperText> */}
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
                        // helperText={
                        //   Email === '' ? (
                        //     <p
                        //       style={{
                        //         color: '#b71c1c'
                        //       }}
                        //     >
                        //       {`Email ${ErrorCustom.Required}`}
                        //     </p>
                        //   ) : null
                        // }
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
                        // helperText={
                        //   password === '' ? (
                        //     <p
                        //       style={{
                        //         color: '#b71c1c'
                        //       }}
                        //     >
                        //       {`Password ${ErrorCustom.Required}`}
                        //     </p>
                        //   ) : null
                        // }
                      />
                      {/* <DatePicker
                        label="Start Date"
                        inputFormat="yyyy-MM-dd"
                        value={startDate}
                        disablePast
                        onChange={(newValue) => {
                          if (newValue) {
                            const parseddate = format(newValue, 'yyyy-MM-dd');

                            setStartDate(parseddate);

                            console.log('startDate', parseddate);
                          } else {
                            setStartDate('');
                          }
                        }}
                        renderInput={(params) => <TextField {...params} />} */}
                      {/* /> */}
                    </Stack>
                    <Box
                      sx={{
                        mt: 3,
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <LoadingButton style={{ marginLeft: 5 }} variant="contained" onClick={sendData}>
                        Create User
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
