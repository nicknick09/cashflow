import FindInPageIcon from '@mui/icons-material/FindInPage';
import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Container,
  Grid,
  TableBody,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Box
} from '@material-ui/core';
import { Stack, Card } from '@mui/material';
import { DatePicker, LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { operatingUnitAsync, getUsersOunameFromUser } from '../../redux/slices/ounameSlice';

import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 12;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const FindOutflow = () => {
  const { themeStretch } = useSettings();
  const [showDialogActual, setShowDialogActual] = useState(false);
  const [ouname, setOuname] = useState('');
  const dispatch = useDispatch();
  const ounameList = useSelector(getUsersOunameFromUser);
  // const { designername: ounamelist } = useSelector((state) => state.organizename);
  console.log('oucheck', ounameList);
  const [toDate, setToDate] = useState('');
  const [forCast, setForcast] = useState('');
  const [actualArrayData, setActualArrayData] = useState([]);
  const [actual1ArrayData, setActual1ArrayData] = useState([]);
  const [jantoFeb, setJantoFeb] = useState('');
  const [febtoMar, setFebtoMar] = useState('');
  const [martoApr, setMartoApr] = useState('');
  const [month, setMonth] = useState('');
  const [foreCast, setForecast] = useState('');
  const [balance, setBalance] = useState('');
  const [prepay, setPrepay] = useState('');
  const [jantoFeb1, setJantoFeb1] = useState('');
  const [febtoMar1, setFebtoMar1] = useState('');
  const [martoApr1, setMartoApr1] = useState('');
  const [month1, setMonth1] = useState('');
  const [actualOut, setActualOut] = useState('');
  const [foreOut, setForeOut] = useState('');
  const [fromDates, setFromDates] = useState('');

  useEffect(() => {
    dispatch(operatingUnitAsync());
  }, [dispatch]);

  const token = localStorage.getItem('accessToken');

  // const SideBar = () => {
  //   const navigate = useNavigate();
  // };

  // var d = new Date().getDate();
  // var m = new Date().getMonth();
  // var y = new Date().getFullYear();
  // var day = new Date().getDay();
  // var hr = new Date().getHours() - 12;
  // var min = new Date().getMinutes();
  // var str = '';
  // switch (day) {
  //   case 0:
  //     str += 'Sun';
  //     break;
  //   case 1:
  //     str += 'Mon';
  //     break;
  //   case 2:
  //     str += 'Tue';
  //     break;
  //   case 3:
  //     str += 'Wed';
  //     break;
  //   case 4:
  //     str += 'Thu';
  //     break;
  //   case 5:
  //     str += 'Fri';
  //     break;
  //   case 6:
  //     str += 'Sat';
  //     break;
  //   default:
  //     break;
  // }
  // if (m === 11) {
  //   m = 12;
  // } else if (m === 0) {
  //   m = 1;
  // } else if (m === 1) {
  //   m = 2;
  // } else if (m === 2) {
  //   m = 3;
  // } else if (m === 3) {
  //   m = 4;
  // } else if (m === 4) {
  //   m = 5;
  // } else if (m === 5) {
  //   m = 6;
  // } else if (m === 6) {
  //   m = 7;
  // } else if (m === 7) {
  //   m = 8;
  // } else if (m === 8) {
  //   m = 9;
  // } else if (m === 9) {
  //   m = 10;
  // } else if (m === 10) {
  //   m = 11;
  // }

  // const fromDate = String(y + '-' + `${m <= 9 ? '0' + m : m}` + '-' + `${d <= 9 ? '0' + d : d}`);

  const currentDate = new Date();
  const y = currentDate.getFullYear();
  const m = currentDate.getMonth() + 1; // Adding 1 to the month since it is zero-indexed
  const d = currentDate.getDate();
  const formattedMonth = m < 10 ? `0${m}` : m;
  const formattedDay = d < 10 ? `0${d}` : d;
  const fromDate = `${y}-${formattedMonth}-${formattedDay}`;

  const findActual = () => {
    if (ounameList === '' || toDate === '') {
      alert('Please fill all fields');
    } else {
      axios
        .get(
          // `https://techstephub.focusrtech.com:5050/CashForecasting/api/actualOutflows/sum?fromDate=${fromDate}&toDate=${toDate}&org_id=${821}`,

          // remove the from date
          `https://techstephub.focusrtech.com:5050/CashForecasting/api/actualOutflows/sum?toDate=${toDate}&org_id=${821}`,
          {
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ' + token
              Authorization: `Bearer  ${token}`
            }
          }
        )
        .then((res) => {
          console.log('datecheck1', res);
          if (res.status === 200 || res.status === 201) {
            setActualArrayData(res.data);
          }
        })
        .catch((err) => {
          console.log('Error', err);
        });

      axios
        .get(`https://techstephub.focusrtech.com:5050/CashForecasting/api/actualOutflows/payments`, {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + token
            Authorization: `Bearer  ${token}`
          }
        })
        .then((res1) => {
          setJantoFeb(res1.data.date1);
          setFebtoMar(res1.data.date2);
          setMartoApr(res1.data.date3);
          setMonth(res1.data.fromDate4);
          setActualOut(res1.data);
        })
        .catch((err) => {
          console.log('Error', err);
        });

      axios
        .get(
          // `https://techstephub.focusrtech.com:5050/CashForecasting/api/forecastOutflows/details?fromDate=${fromDate}&toDate=${toDate}&org_id=${821}`,

          // remove the from date
          `https://techstephub.focusrtech.com:5050/CashForecasting/api/forecastOutflows/details?toDate=${toDate}&org_id=${821}`,
          {
            headers: {
              'Content-Type': 'application/json',
              // Authorization: 'Bearer ' + token
              Authorization: `Bearer  ${token}`
            }
          }
        )
        .then((res2) => {
          console.log('datecheck2', res2);
          setShowDialogActual(true);
          setForecast(res2.data.forecast_receipted_amount);
          setBalance(res2.data.balance_amount);
          setPrepay(res2.data.prepay_amount);
        })
        .catch((err) => {
          console.log('Error', err);
        });

      axios
        .get(`https://techstephub.focusrtech.com:5050/CashForecasting/api/forecastOutflows/payments`, {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + token
            Authorization: `Bearer  ${token}`
          }
        })
        .then((res1) => {
          setJantoFeb1(res1.data.date1);
          setFebtoMar1(res1.data.date2);
          setMartoApr1(res1.data.date3);
          setMonth1(res1.data.fromDate4);
          setForeOut(res1.data);
        })
        .catch((err) => {
          console.log('Error', err);
        });
    }
  };

  return (
    <div>
      {/* <SideBar /> */}
      {/* New table start here */}

      <Page title="OutFlow Actual & Forecast" sx={{ fontsize: '10%' }}>
        <Container maxWidth={themeStretch ? false : 'lg'} sx={{ position: 'fixed' }}>
          <Typography variant="h5" component="h4" paragraph style={{ fontFamily: 'Arial, sans-serif' }}>
            Outflow Actual & Forecast
          </Typography>

          {/* ?New table start here */}

          <Grid item xs={12} md={10}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <FormControl fullWidth>
                    <Select
                      fullWidth
                      labelId="ouname-id-label"
                      id="ouname-id"
                      // label="OU Name"
                      variant="outlined"
                      value={ouname}
                      MenuProps={MenuProps}
                      onChange={(e) => setOuname(e.target.value)}
                    >
                      {ounameList.map((_x, i) => (
                        <MenuItem key={i} value={_x.ou_name}>
                          {_x.ou_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  &nbsp;
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      placeholder="30-10-2000"
                      label="Forecast Date"
                      // type="date"

                      variant="outlined"
                      value="30-10-2000"
                      onChange={(e) => setForcast(e.target.value)}
                    />
                  </FormControl>
                </Stack>
                <Grid item xs={12} sm={12} md={12}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 14, sm: 12 }}>
                    <FormControl fullWidth>
                      <Typography sx={{ color: '#757575' }} style={{ color: '#90a4ae' }}>
                        Sys Date
                      </Typography>
                      <TextField
                        style={{ width: '112%' }}
                        type="date"
                        // label="Sys Date"
                        // id="outlined-To Date"
                        variant="outlined"
                        // inputFormat="dd/MM/yyyy"
                        value={fromDate}
                        onChange={(e) => setFromDates(e.target.value)}
                        // style={{ width: '170px' }}
                        // onChangeRaw={(e) => e.preventDefault()}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <Typography sx={{ color: '#757575' }} style={{ color: '#90a4ae' }}>
                        To Date
                      </Typography>
                      <TextField
                        fullWidth
                        type="date"
                        // label="To Date"
                        // id="outlined-To Date"
                        variant="outlined"
                        style={{ marginLeft: '-12%', width: '112%' }}
                        // inputFormat="dd/MM/yyyy"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        // style={{ width: '170px' }}
                        // onChangeRaw={(e) => e.preventDefault()}
                      />
                    </FormControl>

                    {/* next here */}
                  </Stack>
                </Grid>
                &nbsp;&nbsp;
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  {/* <LoadingButton variant="contained" onClick={click}>
                    CANCEL
                  </LoadingButton> */}

                  <LoadingButton
                    style={{
                      marginLeft: '1%',
                      color: '#fff',
                      background: '#7635dc',
                      marginTop: '-4%',
                      marginBottom: '-1%'
                      // marginRight: '-300%'
                    }}
                    // type="submit"
                    // variant="contained"
                    // loading={isSubmitting || isLoading}
                    onClick={findActual}
                    endIcon={<FindInPageIcon />}
                  >
                    FIND&nbsp;
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Container>
      </Page>

      {/* New table end here */}
      {/* Old table start here */}

      {/* {showDialogActual ? (
        <div className="dialog-box">
          <div className="dialog-close-div">
            <Button
              size="small"
              variant="contained"
              style={{
                color: '#fff',
                background: '#7635dc',
                marginLeft: '90%',
                width: '-3%'
              }}
              // className="close-btn"
              onClick={() => setShowDialogActual(false)}
            >
              X &nbsp;close
            </Button>
          </div> */}
      {showDialogActual ? (
        <Dialog
          open={showDialogActual}
          onClose={() => setShowDialogActual(false)}
          fullScreen // Make the dialog full-screen
        >
          {/* <DialogTitle>InFlow Actual & Forecast</DialogTitle> */}
          <DialogContent>
            {/* </new> */}
            <Button
              size="small"
              variant="contained"
              style={{
                color: '#fff',
                background: '#7635dc',
                marginLeft: '90%',
                width: '-3%'
              }}
              // className="close-btn"
              onClick={() => setShowDialogActual(false)}
            >
              X &nbsp;close
            </Button>

            <center>
              <h1>Actual</h1>
            </center>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">Receipt Amount</TableCell>
                  <TableCell className="table-header">Invoice Amount</TableCell>
                  <TableCell className="table-header">Validated Amount</TableCell>
                  <TableCell className="table-header">UnValidated Amount</TableCell>
                  <TableCell className="table-header">Amount Paid</TableCell>
                  <TableCell className="table-header">Amount Remaining</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {actualArrayData &&
                  actualArrayData.map((x, i) => (
                    <TableRow style={{ textAlign: 'center', fontWeight: 'bold' }} key={i}>
                      <TableCell>{x.receipted_amount}</TableCell>
                      <TableCell>{x.invoice_amount == null ? 'null' : x.invoice_amount}</TableCell>
                      <TableCell>{x.validated_amount == null ? 'null' : x.validated_amount}</TableCell>
                      <TableCell>{x.unvalidated_amount == null ? 'null' : x.unvalidated_amount}</TableCell>
                      <TableCell>{x.amount_paid == null ? 'null' : x.amount_paid}</TableCell>
                      <TableCell>{x.amount_remaining}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <h1 style={{ textAlign: 'center' }}>Actual Payment</h1>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: 'center' }} className="table-header" colSpan="2">
                    {jantoFeb}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }} className="table-header" colSpan="2">
                    {febtoMar}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }} className="table-header" colSpan="2">
                    {martoApr}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }} className="table-header" colSpan="2">
                    {month}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="table-header">PrePay Amount</TableCell>
                  <TableCell className="table-header">Amount Paid</TableCell>
                  <TableCell className="table-header">PrePay Amount</TableCell>
                  <TableCell className="table-header">Amount Paid</TableCell>
                  <TableCell className="table-header">PrePay Amount</TableCell>
                  <TableCell className="table-header">Amount Paid</TableCell>
                  <TableCell className="table-header">PrePay Amount</TableCell>
                  <TableCell className="table-header">Amount Paid</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow style={{ fontWeight: 'bold' }}>
                  <TableCell>
                    {actualOut.paymentDueAmount1.prepay_amount === null
                      ? 'null'
                      : actualOut.paymentDueAmount1.prepay_amount}
                  </TableCell>
                  <TableCell>
                    {actualOut.paymentDueAmount1.amount_paid === null
                      ? 'null'
                      : actualOut.paymentDueAmount1.amount_paid}
                  </TableCell>
                  <TableCell>
                    {actualOut.paymentDueAmount2.prepay_amount === null
                      ? 'null'
                      : actualOut.paymentDueAmount2.prepay_amount}
                  </TableCell>
                  <TableCell>
                    {actualOut.paymentDueAmount2.amount_paid === null
                      ? 'null'
                      : actualOut.paymentDueAmount2.amount_paid}
                  </TableCell>
                  <TableCell>
                    {actualOut.paymentDueAmount3.prepay_amount === null
                      ? 'null'
                      : actualOut.paymentDueAmount3.prepay_amount}
                  </TableCell>
                  <TableCell>
                    {actualOut.paymentDueAmount3.amount_paid === null
                      ? 'null'
                      : actualOut.paymentDueAmount3.amount_paid}
                  </TableCell>
                  <TableCell>
                    {actualOut.paymentDueAmount4.prepay_amount === null
                      ? 'null'
                      : actualOut.paymentDueAmount4.prepay_amount}
                  </TableCell>
                  <TableCell>
                    {actualOut.paymentDueAmount4.amount_paid === null
                      ? 'null'
                      : actualOut.paymentDueAmount4.amount_paid}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <center>
              <h1>Forecast</h1>
            </center>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">Forecast Receipt Amount</TableCell>
                  <TableCell className="table-header">Balance Amount</TableCell>
                  <TableCell className="table-header">Prepay Amount</TableCell>
                  <TableCell className="table-header" colSpan="3">
                    {jantoFeb1}
                  </TableCell>
                  <TableCell className="table-header" colSpan="3">
                    {febtoMar1}
                  </TableCell>
                  <TableCell className="table-header" colSpan="3">
                    {martoApr}
                  </TableCell>
                  <TableCell className="table-header" colSpan="3">
                    {month1}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell className="table-header">Receipted Amount</TableCell>
                  <TableCell className="table-header">PrePay Amount</TableCell>
                  <TableCell className="table-header">Amount Paid</TableCell>
                  <TableCell className="table-header">Receipted Amount</TableCell>
                  <TableCell className="table-header">PrePay Amount</TableCell>
                  <TableCell className="table-header">Amount Paid</TableCell>
                  <TableCell className="table-header">Receipted Amount</TableCell>
                  <TableCell className="table-header">PrePay Amount</TableCell>
                  <TableCell className="table-header">Amount Paid</TableCell>
                  <TableCell className="table-header">Receipted Amount</TableCell>
                  <TableCell className="table-header">PrePay Amount</TableCell>
                  <TableCell className="table-header">Amount Paid</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow style={{ fontWeight: 'bold' }}>
                  <TableCell>{foreCast}</TableCell>
                  <TableCell>{balance}</TableCell>
                  <TableCell>{prepay}</TableCell>
                  <TableCell>
                    {foreOut.paymentDueAmount1.forecast_receipted_amount === null
                      ? 'null'
                      : foreOut.paymentDueAmount1.forecast_receipted_amount}
                  </TableCell>
                  <TableCell>
                    {foreOut.paymentDueAmount1.prepay_amount === null
                      ? 'null'
                      : foreOut.paymentDueAmount1.prepay_amount}
                  </TableCell>
                  <TableCell>
                    {foreOut.paymentDueAmount1.balance_amount === null
                      ? 'null'
                      : foreOut.paymentDueAmount1.balance_amount}
                  </TableCell>
                  <TableCell>
                    {foreOut.paymentDueAmount2.forecast_receipted_amount === null
                      ? 'null'
                      : foreOut.paymentDueAmount2.forecast_receipted_amount}
                  </TableCell>
                  <TableCell>
                    {foreOut.paymentDueAmount2.prepay_amount === null
                      ? 'null'
                      : foreOut.paymentDueAmount2.prepay_amount}
                  </TableCell>
                  <TableCell>
                    {foreOut.paymentDueAmount2.balance_amount === null
                      ? 'null'
                      : foreOut.paymentDueAmount2.balance_amount}
                  </TableCell>
                  <TableCell>
                    {foreOut.paymentDueAmount3.forecast_receipted_amount === null
                      ? 'null'
                      : foreOut.paymentDueAmount3.forecast_receipted_amount}
                  </TableCell>
                  <TableCell>
                    {foreOut.paymentDueAmount3.prepay_amount === null
                      ? 'null'
                      : foreOut.paymentDueAmount3.prepay_amount}
                  </TableCell>
                  <TableCell>
                    {foreOut.paymentDueAmount3.balance_amount === null
                      ? 'null'
                      : foreOut.paymentDueAmount3.balance_amount}
                  </TableCell>
                  <TableCell>
                    {foreOut.paymentDueAmount4.forecast_receipted_amount === null
                      ? 'null'
                      : foreOut.paymentDueAmount4.forecast_receipted_amount}
                  </TableCell>
                  <TableCell>
                    {foreOut.paymentDueAmount4.prepay_amount === null
                      ? 'null'
                      : foreOut.paymentDueAmount4.prepay_amount}
                  </TableCell>
                  <TableCell>
                    {foreOut.paymentDueAmount4.balance_amount === null
                      ? 'null'
                      : foreOut.paymentDueAmount4.balance_amount}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {/* </div>
      ) : null} */}
          </DialogContent>
          {/* <DialogActions></DialogActions> */}
        </Dialog>
      ) : null}
    </div>
  );
};

export default FindOutflow;
