import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/contextAPI/navbar/Navbar';
import Home from './pages/home/Home';
import ProductDetail from "./pages/prodcutDetail/ProductDetail";
import Profile from "./pages/profile/Profile";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Footer from './components/contextAPI/footer/Footer';
import ForgetPassword from './pages/forgetPassword/ForgetPassword';

function App() { 
  return (
    <div>
      <Navbar />
      <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/products" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetail />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgetPassword" element={<ForgetPassword />}></Route>
          <Route path='*' element={<Navigate to='/home' />} />
        </Routes>
      <Footer />
    </div>
  );
};

export default App;
