import FindInPageIcon from '@mui/icons-material/FindInPage';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { DatePicker, LoadingButton } from '@mui/lab';
import { Stack, Card } from '@mui/material';
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

const TABLE_HEAD = [
  { id: 'balance', label: 'Shipped Amount', margin: '' },

  { id: 'invoice', label: 'Invoiced Amount', margin: '' },

  { id: 'receipt', label: 'Receipted Amount', margin: '' },

  { id: 'receiptClear', label: 'Receipt Cleared Amount', margin: '' },

  { id: 'shipped', label: 'Balance Amount', margin: '' }
];

const InFlow = () => {
  const { themeStretch } = useSettings();
  const [showDialogActual, setShowDialogActual] = useState(false);
  const [ouname, setOuname] = useState('');
  // const { cashflowuser: userList } = useSelector((state) => state.flowusers);
  const dispatch = useDispatch();
  const ounameList = useSelector(getUsersOunameFromUser);
  // const { designername: ounamelist } = useSelector((state) => state.organizename);
  console.log('oucheck', ounameList);
  const [sysDate, setSysDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [actualArrayData, setActualArrayData] = useState([]);
  const [balance, setBalance] = useState('');
  const [invoice, setInvoice] = useState('');
  const [receipt, setReceipt] = useState('');
  const [receiptClear, setReceiptClear] = useState('');
  const [shipped, setShipped] = useState('');
  const [jantoFeb, setJantoFeb] = useState('');
  const [febtoMar, setFebtoMar] = useState('');
  const [martoApr, setMartoApr] = useState('');
  const [month, setMonth] = useState('');
  const [foreCast, setForecast] = useState('');
  const [total, setTotal] = useState('');
  const [jantoFeb1, setJantoFeb1] = useState('');
  const [febtoMar1, setFebtoMar1] = useState('');
  const [martoApr1, setMartoApr1] = useState('');
  const [month1, setMonth1] = useState('');
  const [paymentData, setPaymentData] = useState('');
  const [payForecast, setPayForecast] = useState('');

  useEffect(() => {
    dispatch(operatingUnitAsync());
  }, [dispatch]);

  const token = localStorage.getItem('accessToken');

  const currentDate = new Date();
  const y = currentDate.getFullYear();
  const m = currentDate.getMonth() + 1;
  const d = currentDate.getDate();
  const formattedMonth = m < 10 ? `0${m}` : m;
  const formattedDay = d < 10 ? `0${d}` : d;
  const fromDate = `${y}-${formattedMonth}-${formattedDay}`;

  const findActual = () => {
    if (ounameList === '' || fromDate === '' || toDate === '') {
      alert('Please fill all fields');
    } else {
      axios
        .get(
          `https://techstephub.focusrtech.com:5050/CashForecasting/api/actualInflows/details?fromDate=${fromDate}&toDate=${toDate}&org_id=${821}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then((res) => {
          setBalance(res.data.shipped_amount);
          setInvoice(res.data.invoiced_amount);
          setReceipt(res.data.receipted_amount);
          setReceiptClear(res.data.receipt_cleared_amount);
          setShipped(res.data.balance_amount);
          setShowDialogActual(true);
        })
        .catch((err) => {
          console.log('Error', err);
        });

      axios
        .get(`https://techstephub.focusrtech.com:5050/CashForecasting/api/actualInflows/payments`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        .then((res1) => {
          setJantoFeb(res1.data.date1);
          setFebtoMar(res1.data.date2);
          setMartoApr(res1.data.date3);
          setMonth(res1.data.fromDate4);
          setPaymentData(res1.data);
        })
        .catch((err) => {
          console.log('Error', err);
        });
    }

    axios
      .get(
        `https://techstephub.focusrtech.com:5050/CashForecasting/api/forecastInflows/details?fromDate=${fromDate}&toDate=${toDate}&org_id=${821}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        setForecast(res.data.forecast_amount);
        setTotal(res.data.total_amount);
      })
      .catch((err) => {
        console.log('Error', err);
      });

    axios
      .get(`https://techstephub.focusrtech.com:5050/CashForecasting/api/forecastInflows/payments`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then((res1) => {
        setJantoFeb1(res1.data.date1);
        setFebtoMar1(res1.data.date2);
        setMartoApr1(res1.data.date3);
        setMonth1(res1.data.fromDate4);
        setPayForecast(res1.data);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };

  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <SideBar />
      <div
        style={{
          height: '10vh',
          width: '70vw',

          // marginLeft: "2%",
          marginTop: '5%'
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        {/* <Typography style={{ fontSize: "160%", fontWeight: "bold" }}>
        InFlow
      </Typography> */}
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs heading={title} links={[{ name: 'Dashboard' }, { name: 'In Flow' }]} />
          <div
            style={{
              // width: "85vw",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '18%'
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <h2>Parameter</h2>
                  <Stack spacing={3}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                      <TextField size="small" fullWidth id="outlined-basic" label="OU Name" variant="outlined" />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker size="small" label="From Date" />
                        </DemoContainer>
                      </LocalizationProvider>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker']}>
                            <DatePicker label="To Date" />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Stack>
                    </Stack>
                    <Button variant="contained" color="success" className="a-link" onClick={goToInflowTable}>
                      Find
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>

      {/* {showDialogActual ? (
        <div className="dialog-box">
          <div className="dialog-close-div">
            <Button
              size="small"
              variant="contained"
              color="secondary"
              className="close-btn"
              onClick={() => setShowDialogActual(false)}
              style={{ marginLeft: '95%' }}
            >
              X &nbsp;close
            </Button>
          </div> */}

      {/* <new> */}

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

            {/* Actual sum Table started here */}
            <h1 style={{ textAlign: 'center' }}>Actual</h1>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">Shipped Amount</TableCell>
                  <TableCell className="table-header">Invoiced Amount</TableCell>
                  <TableCell className="table-header">Receipted Amount</TableCell>
                  <TableCell className="table-header">Receipt Cleared Amount</TableCell>
                  <TableCell className="table-header">Balance Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  <TableCell>{balance}</TableCell>
                  <TableCell>{invoice}</TableCell>
                  <TableCell>{receipt}</TableCell>
                  <TableCell>{receiptClear}</TableCell>
                  <TableCell>{shipped}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {/* Actual sum Table end here */}

            {/* Actual payment start here */}
            <h1 style={{ textAlign: 'center' }}>Actual Payment</h1>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-header" style={{ textAlign: 'center' }} colSpan={2}>
                    {jantoFeb}
                  </TableCell>
                  <TableCell className="table-header" style={{ textAlign: 'center' }} colSpan={2}>
                    {febtoMar}
                  </TableCell>
                  <TableCell className="table-header" style={{ textAlign: 'center' }} colSpan={2}>
                    {martoApr}
                  </TableCell>
                  <TableCell className="table-header" style={{ textAlign: 'center' }} colSpan={2}>
                    {month}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
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
                <TableRow style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  <TableCell>
                    {paymentData.paymentDueAmount1.prepay_amount === null
                      ? 'null'
                      : paymentData.paymentDueAmount1.prepay_amount}
                  </TableCell>
                  <TableCell>{paymentData.paymentDueAmount1.amount_paid}</TableCell>
                  <TableCell>{paymentData.paymentDueAmount2.prepay_amount}</TableCell>
                  <TableCell>{paymentData.paymentDueAmount2.amount_paid}</TableCell>
                  <TableCell>{paymentData.paymentDueAmount3.prepay_amount}</TableCell>
                  <TableCell>{paymentData.paymentDueAmount3.amount_paid}</TableCell>
                  <TableCell>{paymentData.paymentDueAmount4.prepay_amount}</TableCell>
                  <TableCell>{paymentData.paymentDueAmount4.amount_paid}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {/* Actual payment end here */}

            {/* Forecast sum table start here */}
            <h1 style={{ textAlign: 'center' }}>ForeCast</h1>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">Forecast Shipment</TableCell>
                  <TableCell className="table-header">Balance Amount</TableCell>
                  <TableCell className="table-header">{jantoFeb1}</TableCell>
                  <TableCell className="table-header">{febtoMar1}</TableCell>
                  <TableCell className="table-header">{martoApr}</TableCell>
                  <TableCell className="table-header">{month1}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="table-header" style={{ textAlign: 'center' }}>
                    Payment
                  </TableCell>
                  <TableCell className="table-header" style={{ textAlign: 'center' }}>
                    Payment
                  </TableCell>
                  <TableCell className="table-header" style={{ textAlign: 'center' }}>
                    Payment
                  </TableCell>
                  <TableCell className="table-header" style={{ textAlign: 'center' }}>
                    Payment
                  </TableCell>
                  <TableCell className="table-header" style={{ textAlign: 'center' }}>
                    Payment
                  </TableCell>
                  <TableCell className="table-header" style={{ textAlign: 'center' }}>
                    Payment
                  </TableCell>
                </TableRow>
                <TableRow style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  <TableCell style={{ textAlign: 'center' }}>{foreCast}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{total}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{payForecast.paymentDueAmount1}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{payForecast.paymentDueAmount2}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{payForecast.paymentDueAmount3}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{payForecast.paymentDueAmount4}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {/* Forecast sum table end here */}
            {/* </div>
      ) : null} */}
          </DialogContent>
          {/* <DialogActions></DialogActions> */}
        </Dialog>
      ) : null}
    </div>
  );
};

export default InFlow;
