import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import words from 'num-to-words';
import 'bootstrap/dist/css/bootstrap.min.css';

export const PrintBill = ({ adminToken }) => {
  const { id } = useParams();
  const [getItem, setGetItem] = useState(null);

  const fetchBill = async () => {
    try {
      const response = await fetch(`https://jayinfo-webapp.onrender.com/api/v1/bills/getBillById/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch invoice');
      }

      const result = await response.json();
      setGetItem(result.data.bill);
      console.log(result.data.bill);
    } catch (error) {
      console.error('Error fetching the invoice:', error);
    }
  };

  useEffect(() => {
    fetchBill();
  }, [id]);

  const downloadInvoice = () => {
    const invoice = document.getElementById('invoice');
    const opt = {
      margin: 0,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(invoice).set(opt).save();
  };

  const convertNumberToWords = (amount) => {
    if (typeof amount === 'number') {
      return words(amount) + ' Only';
    }
    return 'Invalid Amount';
  };

  if (!getItem) {
    return <div>Loading...</div>;
  }

  const subtotal = getItem.products.reduce((acc, item) => acc + (item.productQuantity * item.productPrice), 0).toFixed(2);

  return (
    <React.Fragment>
      <div className="container mt-5" id="bill-container">
        <div className="card shadow-lg p-4 mb-5 bg-white rounded" id="invoice">
          <div className="text-center mb-4">
            <h1 className="display-5 font-weight-bold"><b> <u> JAY INFO TECH </u></b> </h1>
            <h5>
              <u>
                New Reliance Market, Degaon Naka, Solapur 413001 <br />
                GSTIN/UIN: 27BZFPB3458Q1ZW | State Name: Maharashtra, Code: 13 <br />
              </u>
              Email: <a href="mailto:jayinfotech20@gmail.com">jayinfotech20@gmail.com</a>
            </h5>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <h5>Invoice No: JIIT/{getItem.products.length > 0 ? String(getItem.products.length).padStart(3, '0') : '001'}/24-25</h5>
              <h5>Dated: {new Date(getItem.createdAt).toLocaleDateString()}</h5>
            </div>
            <div className="col-md-6 text-md-right">
              <b>Buyer Name: {getItem.customerName}</b>
              <br />
              <p>Buyer Address: {getItem.customerAddress}</p>
            </div>
          </div>

          <h3 className="text-center mb-4">Products</h3>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Sr No</th>
                  <th>Description of Goods</th>
                  <th>Quantity</th>
                  <th>Rate (INR)</th>
                  <th>Tax</th>
                  <th>Total Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                {getItem.products.length > 0 ? (
                  getItem.products.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.productName}</td>
                      <td>{product.productQuantity} items</td>
                      <td>{product.productPrice.toFixed(2)}</td>
                      <td>SGST 9% / CGST 9%</td>
                      <td>{(product.productPrice * product.productQuantity).toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No products available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <p><strong>Amount Chargeable (in words):</strong> {convertNumberToWords(getItem.totalAmounts)}</p>
            </div>
            <div className="col-md-6 text-right">
              <p><strong>Subtotal:</strong> ₹{subtotal}</p>
              <p><strong>Total Amount:</strong> ₹{getItem.totalAmounts}</p>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6 text-center">
              <p className="font-weight-bold">Customer’s Seal and Signature</p>
              <p>{getItem.customerName}</p>
            </div>
            <div className="col-md-6 text-center">
              <p className="font-weight-bold">For Jay Info Tech</p>
              <p>
                Shubham Lavate <br />
                Digitally signed On {new Date().toLocaleDateString()} <br />
              </p>
              <p className="mt-3">
                <span>Prepared</span> &nbsp; <span>Verified</span> &nbsp; <span>Authorised</span>
              </p>
            </div>
          </div>

          <p className="text-center font-weight-bold mt-4">This is a Computer Generated Invoice</p>
        </div>

        <div className="text-center">
          <button type="button" className="btn btn-primary" onClick={downloadInvoice}>
            Download Invoice
          </button>
        </div>
      </div>

      <style>
        {`
          #bill-container {
            max-width: 900px;
            margin: 0 auto;
          }
          #invoice {
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
          }
          .table-bordered th, .table-bordered td {
            border: 1px solid #dee2e6;
          }
          .btn-primary {
            margin-top: 20px;
          }
        `}
      </style>
    </React.Fragment>
  );
};
