import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/contextAPI/navbar/Navbar';
import RoleIndicator from "./components/roleIndicator/RoleIndicator";
import Home from './pages/home/Home';
import ProductDetail from "./pages/prodcutDetail/ProductDetail";
import ProdcutUpdate from "./pages/productUpdate/ProdcutUpdate";
import Profile from "./pages/profile/Profile";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Footer from './components/contextAPI/footer/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <RoleIndicator />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/products" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="/productUpdate" element={<ProdcutUpdate />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
