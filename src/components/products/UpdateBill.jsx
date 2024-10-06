import React, { useState, useEffect } from 'react';
import { Button, Card, Container, TextField, Typography, Grid, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useParams, useNavigate } from 'react-router-dom';

import BASE_URL from '../coonstant';

export const UpdateBillForm = ({adminToken}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        customerName: '',
        customerAddress: '',
        customerEmail: '',
        customerPhone: '',
        paymentType: '',
        BillDate: '',
        status: '',
        otherDetails: '',
        products: [{
            productName: '', productDescription: '', productQuantity: 1,
            productPrice: 0, totalAmounts: '',
        }],
    });
    
    

   

    // Fetch the current bill data to populate the form on component mount
    useEffect(() => {
        const fetchBillData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/bills/getBillById/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${adminToken}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data.data.bill);
                                
                } else {
                    throw new Error('Failed to fetch bill data');
                }
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchBillData();
    }, [id, adminToken]);

    const onCustomerChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onProductChange = (index, e) => {
        const updatedProducts = formData.products.map((product, i) =>
            i === index ? { ...product, [e.target.name]: e.target.value } : product
        );
        setFormData({
            ...formData,
            products: updatedProducts,
        });
    };

    const addProduct = () => {
        setFormData((prevData) => ({
            ...prevData,
            products: [
                ...prevData.products,
                {
                    productName: '',
                    productDescription: '',
                    productQuantity: 1,
                    productPrice: 0,
                    totalAmounts: '', // Add this property to match the structure
                },
            ],
        }));
    };

    const removeProduct = (index) => {
        const updatedProducts = formData.products.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            products: updatedProducts,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const normalizedFormData = {
            ...formData,
            products: formData.products.map((product) => ({
                productName: product.productName,
                productQuantity: product.productQuantity,
                productPrice: product.productPrice,
                productDescription: product.productDescription,
            })),
        };

        try {
            const response = await fetch(`${BASE_URL}/api/v1/bills/updateBill/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                },
                body: JSON.stringify(normalizedFormData)
            });

            if (!response.ok) {
                throw new Error('Failed to update bill');
            }

            const data = await response.json();
            alert('Bill updated successfully!');
            navigate('/dashboard')
            // Reset the form or handle success as needed
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Container component='main' maxWidth="md">
            <Card sx={{ padding: 3, margin: 3, boxShadow: 3 }}>
                <Typography variant='h5' align='center' gutterBottom>
                    Update Customer Bill
                </Typography>

                {/* Customer Information */}
                <Typography variant='h6' gutterBottom>
                    Customer Information
                </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Customer Name"
                                name="customerName"
                                variant="outlined"
                                value={formData.customerName}
                                fullWidth
                                onChange={onCustomerChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email"
                                name="customerEmail"
                                variant="outlined"
                                value={formData.customerEmail}
                                fullWidth
                                onChange={onCustomerChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Phone Number"
                                name="customerPhone"
                                variant="outlined"
                                value={formData.customerPhone}
                                fullWidth
                                onChange={onCustomerChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Address"
                                name="customerAddress"
                                variant="outlined"
                                value={formData.customerAddress}
                                fullWidth
                                onChange={onCustomerChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type='date'
                                name="BillDate"
                                variant="outlined"
                                value={formData.BillDate.slice(0,10)}
                                fullWidth
                                onChange={onCustomerChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Payment Status'
                                name="status"
                                variant="outlined"
                                value={formData.status}
                                fullWidth
                                onChange={onCustomerChange}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                label="Other Details"
                                name="otherDetails"
                                type="text"
                                variant="outlined"
                                value={formData.otherDetails}
                                fullWidth
                                onChange={onCustomerChange}
                            />
                        </Grid>
                    </Grid>

                    {/* Product Information */}
                    <Typography variant='h6' gutterBottom>
                        Product Information
                    </Typography>
                    {formData.products.map((product, index) => (
                        <div key={index}>
                            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                <Grid item xs={3}>
                                    <TextField
                                        label="Product Name"
                                        name="productName"
                                        variant="outlined"
                                        value={formData.products[index].productName}
                                        fullWidth
                                        onChange={(e) => onProductChange(index, e)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="Quantity"
                                        name="productQuantity"
                                        type="number"
                                        variant="outlined"
                                        value={formData.products[index].productQuantity}
                                        fullWidth
                                        onChange={(e) => onProductChange(index, e)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="Price"
                                        name="productPrice"
                                        type="number"
                                        variant="outlined"
                                        value={formData.products[index].productPrice}
                                        fullWidth
                                        onChange={(e) => onProductChange(index, e)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        label="Total Price"
                                        name="totalAmounts"
                                        type="number"
                                        variant="outlined"
                                        value={formData.products[index].totalAmounts}
                                        fullWidth
                                        onChange={(e) => onProductChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        label="Product Description"
                                        name="productDescription"
                                        type="text"
                                        variant="outlined"
                                        value={formData.products[index].productDescription}
                                        fullWidth
                                        onChange={(e) => onProductChange(index, e)}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {index > 0 && (
                                        <IconButton onClick={() => removeProduct(index)} color="error">
                                            <RemoveIcon />
                                        </IconButton>
                                    )}
                                </Grid>
                            </Grid>
                            <Divider sx={{ marginY: 2 }} />
                        </div>
                    ))}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addProduct}
                        startIcon={<AddIcon />}
                        sx={{ marginTop: 2 }}
                    >
                        Add Product
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        sx={{ marginTop: 2, marginLeft: 2 }}
                    >
                        Update Bill
                    </Button>
                </form>
            </Card>
        </Container>
    );
};
