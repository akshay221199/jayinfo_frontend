import React from 'react';
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import  {Navbar}  from './components/bars/Navbar';
import  {SideBar}  from './components/bars/SideBar';
import { Login } from './components/admin/Login';
import { Profile } from './components/admin/Profile';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home } from './components/admin/Home';
import { Service } from './components/products/Service';
import { BillForm } from './components/products/BillFrom';
// import { BillFile } from './components/products/BillFile';
import { DashboardDocs } from './components/products/Dashboard';
import { UpdateBillForm } from './components/products/UpdateBill';
import { PrintBill } from './components/products/PrintBill';



function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

const adminToken = getCookie('adminToken');

const isLoggedIn = !!adminToken;


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', 
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
   <Router>
   <Navbar adminToken={adminToken } />
   <SideBar adminToken={adminToken }/>
   <Routes>
  <Route path="/login" element={<Login adminToken={adminToken} />} />
  <Route path='/addBill' element={<BillForm adminToken={adminToken} />} />
  <Route path='/profile' element={<Profile adminToken={adminToken} />} />
  <Route path='/dashboard' element={<DashboardDocs adminToken={adminToken} />} />
  <Route path='/Home' element={<Home adminToken={adminToken} />} />
  <Route path='/service' element={<Service adminToken={adminToken} />} />
  <Route path='/updateBill/:id' element={<UpdateBillForm adminToken={adminToken} />} />
  <Route path='/printBill/:id' element={<PrintBill adminToken={adminToken} />} />
</Routes>

   {/* <BillFile /> */}
   </Router>
   </ThemeProvider>
  );
}

export default App;
