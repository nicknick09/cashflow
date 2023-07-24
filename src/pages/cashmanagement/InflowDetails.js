import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import FindInFlow from './FindInflow';

const InflowDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ouname = queryParams.get('ouname');
  const params = useParams();
  // const fromDate = queryParams.get('fromDate');
  const toDate = queryParams.get('toDate');
  const [balance, setBalance] = useState('');
  const [invoice, setInvoice] = useState('');
  const [receipt, setReceipt] = useState('');
  const [receiptClear, setReceiptClear] = useState('');
  const [shipped, setShipped] = useState('');
  const [jantoFeb, setJantoFeb] = useState('');
  const [febtoMar, setFebtoMar] = useState('');
  const [martoApr, setMartoApr] = useState('');
  const [month, setMonth] = useState('');
  const [jantoFeb1, setJantoFeb1] = useState('');
  const [febtoMar1, setFebtoMar1] = useState('');
  const [martoApr1, setMartoApr1] = useState('');
  const [month1, setMonth1] = useState('');
  const [foreCast, setForecast] = useState('');
  const [total, setTotal] = useState('');
  const [paymentData, setPaymentData] = useState('');
  const [actualData, setActualData] = useState('');
  const [forecastData, setForecastData] = useState('');
  const [actualPaymentData, setActualPaymentData] = useState('');
  const [forecastPaymentData, setForecastPaymentData] = useState('');
  const currentDate = new Date();
  const y = currentDate.getFullYear();
  const m = currentDate.getMonth() + 1; // Adding 1 to the month since it is zero-indexed
  const d = currentDate.getDate();
  const formattedMonth = m < 10 ? `0${m}` : m;
  const formattedDay = d < 10 ? `0${d}` : d;
  const fromDate = `${y}-${formattedMonth}-${formattedDay}`;
  console.log('checkfromdate', fromDate);

  // const inflow = [
  //   // Sample query parameters
  //   { fromDate: 2010 }, // Sample object 1
  //   { toDate: 2023 }
  // ];

  // const dateDetails = inflow.find((_x) => _x.fromDate, _x.toDate === Number(params.type));

  // const dateDetails = inflow.find(
  //   (_x) => _x.fromDate === Number(params.fromDate) && _x.toDate === Number(params.toDate)
  // );

  // console.log('checkparams', dateDetails);
  // <FindInFlow fromDateProp={fromDate} toDateProp={toDate} />;
  // console.log('fromDatecheck', fromDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        // Validate fromDate and toDate
        // if (!fromDate || !toDate) {
        //   console.error('Error: fromDate or toDate is null or invalid.');
        //   return;
        // }

        // Actual Inflows Details
        const actualResponse = await axios.get(
          `https://techstephub.focusrtech.com:5050/CashForecasting/api/actualInflows/details?fromDate=${fromDate}&toDate=${toDate}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log('fromdate', fromDate);
        setBalance(actualResponse.data.balance_amount);
        setInvoice(actualResponse.data.invoiced_amount);
        setReceipt(actualResponse.data.receipted_amount);
        setReceiptClear(actualResponse.data.receipt_cleared_amount);
        setShipped(actualResponse.data.shipped_amount);
        setActualData(actualResponse.data);
        console.log('dfdfsdsfdsf', actualResponse);

        // const actualResponse = await axios
        //   .get(
        //     `https://techstephub.focusrtech.com:5050/CashForecasting/api/actualInflows/details?fromDate=${fromDate}&toDate=${toDate}`,
        //     {
        //       headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${token}`
        //       }
        //     }
        //   )
        //   // setBalance(actualResponse.data.balance_amount);
        //   // setInvoice(actualResponse.data.invoiced_amount);
        //   // setReceipt(actualResponse.data.receipted_amount);
        //   // setReceiptClear(actualResponse.data.receipt_cleared_amount);
        //   // setShipped(actualResponse.data.shipped_amount);

        //   .then((res) => {
        //     console.log('response333 data', res.data);
        //     setBalance(res.data.shipped_amount);
        //     setInvoice(res.data.invoiced_amount);
        //     setReceipt(res.data.receipted_amount);
        //     setReceiptClear(res.data.receipt_cleared_amount);
        //     setShipped(res.data.balance_amount);
        //     // setShowDialogActual(true);
        //   })
        //   .catch((err) => {
        //     console.log('Error', err);
        //   });
        // setActualData(actualResponse.data);

        // Actual Inflows Payments API
        const actualPaymentResponse = await axios
          .get('https://techstephub.focusrtech.com:5050/CashForecasting/api/actualInflows/payments', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
          .then((res1) => {
            console.log('responsedata11', res1.data);
            setJantoFeb(res1.data.date1);
            setFebtoMar(res1.data.date2);
            setMartoApr(res1.data.date3);
            setMonth(res1.data.fromDate4);
            setPaymentData(res1.data);
          })
          .catch((err) => {
            console.log('Error', err);
          });

        setActualPaymentData(actualPaymentResponse.data);

        // Forecast Inflows Details API
        const forecastResponse = await axios
          .get(
            `https://techstephub.focusrtech.com:5050/CashForecasting/api/forecastInflows/details?fromDate=${fromDate}&toDate=${toDate}`,
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

        setForecastData(forecastResponse.data);

        // Forecast Inflows Payments API
        const forecastPaymentResponse = await axios.get(
          'https://techstephub.focusrtech.com:5050/CashForecasting/api/forecastInflows/payments',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );
        setForecastPaymentData(forecastPaymentResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fromDate, toDate]);

  return (
    <Container>
      <h1>Actual</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Shipped Amount</TableCell>
            <TableCell>Invoiced Amount</TableCell>
            <TableCell>Receipted Amount</TableCell>
            <TableCell>Receipt Cleared Amount</TableCell>
            <TableCell>Balance Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{balance}</TableCell>
            <TableCell>{invoice}</TableCell>
            <TableCell>{receipt}</TableCell>
            <TableCell>{receiptClear}</TableCell>
            <TableCell>{shipped}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* <h1>Actual Payment</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>{jantoFeb}</TableCell>
            <TableCell colSpan={2}>{febtoMar}</TableCell>
            <TableCell colSpan={2}>{martoApr}</TableCell>
            <TableCell colSpan={2}>{month}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>PrePay Amount</TableCell>
            <TableCell>Amount Paid</TableCell>
            <TableCell>PrePay Amount</TableCell>
            <TableCell>Amount Paid</TableCell>
            <TableCell>PrePay Amount</TableCell>
            <TableCell>Amount Paid</TableCell>
            <TableCell>PrePay Amount</TableCell>
            <TableCell>Amount Paid</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{actualPaymentData.paymentDueAmount1.prepay_amount}</TableCell>
            <TableCell>{actualPaymentData.paymentDueAmount1.amount_paid}</TableCell>
            <TableCell>{actualPaymentData.paymentDueAmount2.prepay_amount}</TableCell>
            <TableCell>{actualPaymentData.paymentDueAmount2.amount_paid}</TableCell>
            <TableCell>{actualPaymentData.paymentDueAmount3.prepay_amount}</TableCell>
            <TableCell>{actualPaymentData.paymentDueAmount3.amount_paid}</TableCell>
            <TableCell>{actualPaymentData.paymentDueAmount4.prepay_amount}</TableCell>
            <TableCell>{actualPaymentData.paymentDueAmount4.amount_paid}</TableCell>
          </TableRow>
        </TableBody>
      </Table> */}

      <h1>Forecast</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Forecast Shipment</TableCell>
            <TableCell>Balance Amount</TableCell>
            <TableCell>{jantoFeb1}</TableCell>
            <TableCell>{febtoMar1}</TableCell>
            <TableCell>{martoApr1}</TableCell>
            <TableCell>{month1}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{forecastData.forecast_amount}</TableCell>
            <TableCell>{forecastData.total_amount}</TableCell>
            <TableCell>{forecastPaymentData.paymentDueAmount1}</TableCell>
            <TableCell>{forecastPaymentData.paymentDueAmount2}</TableCell>
            <TableCell>{forecastPaymentData.paymentDueAmount3}</TableCell>
            <TableCell>{forecastPaymentData.paymentDueAmount4}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

export default InflowDetails;
