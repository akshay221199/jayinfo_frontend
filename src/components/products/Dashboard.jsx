import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from '@mui/material';
import { Delete, Edit, Print } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import BASE_URL from '../coonstant';


export const DashboardDocs = ({adminToken}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const fetchData = async () => {
    try {
      const response = await fetch(`https://jayinfo-webapp.onrender.com/api/v1/bills/getBills`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result.data.bills);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  const handleDelete = async (id) => {
    try {
      await fetch(`https://jayinfo-webapp.onrender.com/api/v1/bills/deleteBill/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });
      setData(data.filter((data) => data._id !== id)); // Remove bill from state after deletion
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Main content area */}
      <Box sx={{ marginLeft: '190px', position: 'inherit', flexGrow: 1, padding: '1rem' }}>
        <Container component="main" maxWidth="lg">
          <Card sx={{ padding: 3, boxShadow: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Total Customer Bills
            </Typography>
            {data && data.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ bgcolor: '#f0f0f1' }}>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Customer Name</TableCell>
                      <TableCell>Customer Phone</TableCell>
                      <TableCell>Customer Address</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Total Bill</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Delete</TableCell>
                      <TableCell>Update</TableCell>
                      <TableCell>Print</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((bill, index) => (
                      <React.Fragment key={bill._id}>
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{bill.customerName}</TableCell>
                          <TableCell>{bill.customerPhone}</TableCell>
                          <TableCell>{bill.customerAddress}</TableCell>
                          <TableCell colSpan={5}></TableCell>
                        </TableRow>
                        {bill.products.map((product, i) => (
                          <TableRow key={i}>
                            <TableCell></TableCell>
                            <TableCell colSpan={3}></TableCell>
                            <TableCell>{product.productName}</TableCell>
                            <TableCell>{product.productQuantity}</TableCell>
                            <TableCell>{product.productPrice}</TableCell>
                            <TableCell>{product.productQuantity * product.productPrice}</TableCell>
                            <TableCell>{bill.Date.slice(0, 10)}</TableCell>
                            <TableCell>
                              <IconButton onClick={() => handleDelete(bill._id)}>
                                <Delete color="error" />
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <Link to={`/updateBill/${bill._id}`}>
                                <IconButton>
                                  <Edit color="primary" />
                                </IconButton>
                              </Link>
                            </TableCell>
                            <TableCell>
                            <Link to={`/printBill/${bill._id}`}>
                              <IconButton>
                                <Print color="success" />
                              </IconButton>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}

                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="h6">No Data Found</Typography>
            )}
          </Card>
        </Container>
      </Box>
    </Box>
  );
};
