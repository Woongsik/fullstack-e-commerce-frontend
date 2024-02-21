import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/contextAPI/navbar/Navbar';
import Home from './pages/home/Home';
import Detail from "./pages/detail/Detail";
import Cart from "./pages/cart/Cart";
import Footer from './components/contextAPI/footer/Footer';
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/products" element={<Home />}></Route>
        <Route path="/product/:id" element={<Detail />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
