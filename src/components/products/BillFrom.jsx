import React, { useState } from 'react';
import { Button, Card, Container, TextField, Typography, Grid, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BASE_URL from '../coonstant';



export const BillForm = ({adminToken}) => {
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

    // const [totalAmount, setTotalAmount] = useState(0); // New state for total amount


    



    const oncustomerChanger = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

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


    const fromSubmit = async (e) => {
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

            const response = await fetch(`https://jayinfo-webapp.onrender.com/api/v1/bills/createBill`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`

                },
                body: JSON.stringify(normalizedFormData)
            });
            if (!response.ok) {
                throw new Error('Failed to generate bill');
            }
            const data = await response.json();
            setFormData({
                customerName: '',
                customerAddress: '',
                customerEmail: '',
                customerPhone: '',
                paymentType: '',
                BillDate: '',
                status: '',
                otherDetails: '',
                products: [{ productName: '', productDescription: '', productQuantity: 1, totalAmounts:'', productPrice: 0 }],
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Container component='main' maxWidth="md">
            <Card sx={{ padding: 3, margin: 3, boxShadow: 3 }}>
                <Typography variant='h5' align='center' gutterBottom>
                    Create Customer Bill
                </Typography>

                {/* Customer Information */}
                <Typography variant='h6' gutterBottom>
                    Customer Information
                </Typography>
                <form onSubmit={fromSubmit}>
                    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Customer Name"
                                name="customerName"
                                variant="outlined"
                                value={formData.customerName}
                                fullWidth
                                onChange={oncustomerChanger}
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
                                onChange={oncustomerChanger}
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
                                onChange={oncustomerChanger}
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
                                onChange={oncustomerChanger}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type='date'
                                name="BillDate"
                                variant="outlined"
                                value={formData.BillDate}
                                fullWidth
                                onChange={oncustomerChanger}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Payment Status'
                                name="status"
                                variant="outlined"
                                value={formData.status}
                                fullWidth
                                onChange={oncustomerChanger}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                label="Other Details"
                                name="otherDetails"
                                type="text"
                                variant="outlined"
                                value={formData.otherDetails} // Fix: Access product by index
                                fullWidth
                                onChange={oncustomerChanger} // Fix: Correctly pass index and event
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
                                        value={formData.products[index].productName} // Fix: Access product by index
                                        fullWidth
                                        onChange={(e) => onProductChange(index, e)} // Fix: Correctly pass index and event
                                        required
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="Quantity"
                                        name="productQuantity"
                                        type="number"
                                        variant="outlined"
                                        value={formData.products[index].productQuantity} // Fix: Access product by index
                                        fullWidth
                                        onChange={(e) => onProductChange(index, e)} // Fix: Correctly pass index and event
                                        required
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="Price"
                                        name="productPrice"
                                        type="number"
                                        variant="outlined"
                                        value={formData.products[index].productPrice} // Fix: Access product by index
                                        fullWidth
                                        onChange={(e) => onProductChange(index, e)} // Fix: Correctly pass index and event
                                        required
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        label="Total Price"
                                        name="totalAmounts"
                                        type="number"
                                        variant="outlined"
                                        value={formData.products[index].totalAmounts} // Fix: Access product by index
                                        fullWidth
                                        onChange={(e) => onProductChange(index, e)} // Fix: Correctly pass index and event
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        label="Product Description"
                                        name="productDescription"
                                        type="text"
                                        variant="outlined"
                                        value={formData.products[index].productDescription} // Fix: Access product by index
                                        fullWidth
                                        onChange={(e) => onProductChange(index, e)} // Fix: Correctly pass index and event
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
                        Submit Bill
                    </Button>
                </form>
            </Card>
        </Container>
    );
};
