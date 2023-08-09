
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './Pages/HomePage';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import { ToastContainer } from'react-toastify';
import { SignInPage } from './SignInPage/SignInPage';
import { SignUpPage } from './SignUpPage/SignUpPage';
import CartPage from './Pages/CartPage';
import ShippingAddressPage from './Pages/ShippingAddressPage';
import PaymentPage from './Pages/PaymentPage';
import Placeorder from './Pages/PlaceOrderPage';
import ProductPage from './Pages/ProductPage';
import SearchPage from './Pages/SearchPage';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
      <NavBar/>
      <ToastContainer position="bottom-center" limit={5}/>
      <main>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/signin" element={<SignInPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/shipping" element={<ShippingAddressPage/>}/>
          <Route path="/payment" element={<PaymentPage/>}/>
          <Route path="/placeorder" element={<Placeorder/>}/>
          <Route path="/product/:token" element={<ProductPage/>}/>
          <Route path="/search" element={<SearchPage/>}/>
        </Routes>
        </main>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
