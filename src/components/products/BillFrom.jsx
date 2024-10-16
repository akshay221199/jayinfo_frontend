import React, { useState, useEffect } from 'react';
import { Button, Card, Container, TextField, Typography, Grid, IconButton, Divider, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const BillForm = ({ adminToken }) => {
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
            productPrice: 0, totalAmounts: 0,
        }],
    });

    const [totalAmount, setTotalAmount] = useState(0); // State for total amount
    const [applyTax, setApplyTax] = useState(false); // State for tax checkbox

    // Function to update the total amount whenever product data or tax changes
    useEffect(() => {
        const calculateTotalAmount = () => {
            const total = formData.products.reduce((sum, product) => {
                const productTotal = product.productQuantity * product.productPrice;
                return sum + productTotal;
            }, 0);

            // If tax checkbox is checked, add 18% tax to the total
            const totalWithTax = applyTax ? total + total * 0.18 : total;
            setTotalAmount(totalWithTax);
        };

        calculateTotalAmount();
    }, [formData.products, applyTax]); // Dependency on products and tax checkbox

    // Function to handle customer information changes
    const onCustomerChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Function to handle product information changes
    const onProductChange = (index, e) => {
        const updatedProducts = formData.products.map((product, i) =>
            i === index ? { ...product, [e.target.name]: e.target.value } : product
        );
        setFormData({
            ...formData,
            products: updatedProducts,
        });
    };

    // Function to add a new product
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
                    totalAmounts: 0,
                },
            ],
        }));
    };

    // Function to remove a product
    const removeProduct = (index) => {
        const updatedProducts = formData.products.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            products: updatedProducts,
        }));
    };

    // Function to handle form submission
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
            taxApplied: applyTax, // Include whether tax is applied in the form data
        };

        try {
            const response = await fetch(`https://jayinfo-webapp.onrender.com/api/v1/bills/createBill`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                },
                body: JSON.stringify(normalizedFormData),
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
                products: [{ productName: '', productDescription: '', productQuantity: 1, totalAmounts: 0, productPrice: 0 }],
            });
            setTotalAmount(0); // Reset total amount after submission
            setApplyTax(false); // Reset tax checkbox
        } catch (error) {
            console.error(error.message);
        }
    };

    // Handle tax checkbox change
    const handleTaxChange = (e) => {
        setApplyTax(e.target.checked);
    };

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
                                value={formData.BillDate}
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
                                        value={product.productName}
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
                                        value={product.productQuantity}
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
                                        value={product.productPrice}
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
                                        value={product.productQuantity * product.productPrice}
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        label="Product Description"
                                        name="productDescription"
                                        type="text"
                                        variant="outlined"
                                        value={product.productDescription}
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
                        </div>
                    ))}

                    {/* Add Product Button */}
                    <Button variant="outlined" onClick={addProduct} startIcon={<AddIcon />}>
                        Add Product
                    </Button>

                    <Divider sx={{ margin: '20px 0' }} />

                    {/* Tax Checkbox */}
                    <FormControlLabel
                        control={<Checkbox checked={applyTax} onChange={handleTaxChange} />}
                        label="Apply 18% Tax"
                    />

                    {/* Total Amount */}
                    <Typography variant="h6" align='right'>
                        Total Amount: ₹ {totalAmount.toFixed(2)}
                    </Typography>

                    {/* Submit Button */}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Generate Bill
                    </Button>
                </form>
            </Card>
        </Container>
    );
};
