import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Dashboard } from './Dashboard';
import BASE_URL from '../coonstant';


export const BillFile = ({adminToken}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);  // For loading state
    const [error, setError] = useState(null);      // For error state

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim(); // Trim any spaces around the cookie
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1); // Return the value of the cookie
            }
        }
        return null; // Return null if not found
    }

    // Fetch the token from the cookie
    // const adminToken = getCookie('adminToken');

    const fetchData = async () => {
        try {
            const response = await fetch(`https://jayinfo-webapp.onrender.com/api/v1/bills/getBills`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${isLoggedIn}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await response.json();
            setData(result.data.bills);
            console.log('Fetched bills:', result.data.bills);

            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();  // Call fetchData once on component mount
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='container'>
            <Typography variant="h4" gutterBottom>Bill File</Typography>

            {data && data.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Customer Address</TableCell>
                                <TableCell>Customer Email</TableCell>
                                <TableCell>Customer Phone</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Payment Method</TableCell>
                                <TableCell>Total Amount</TableCell>
                                <TableCell>Products</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((bill, index) => (
                                <TableRow key={index}>
                                    <TableCell>{bill.customerName}</TableCell>
                                    <TableCell>{bill.customerAddress}</TableCell>
                                    <TableCell>{bill.customerEmail}</TableCell>
                                    <TableCell>{bill.customerPhone}</TableCell>
                                    <TableCell>{bill.status}</TableCell>
                                    <TableCell>{bill.paymentMethod}</TableCell>
                                    <TableCell>{bill.totalAmounts}</TableCell>
                                    <TableCell>
                                        {bill.products.map((product, i) => (
                                            <div key={i}>
                                                <p>Product {i + 1}: {product.productName}</p>
                                                <p>Description: {product.productDescription}</p>
                                                <p>Quantity: {product.productQuantity}</p>
                                                <p>Price: {product.productPrice}</p>
                                                <p>Tax: {product.taxAmount}</p>
                                                <p>Total: {product.productQuantity * product.productPrice}</p>
                                            </div>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="h6">No Data Found</Typography>
            )}

            <Dashboard data={data} />
        </div>
    );
};
