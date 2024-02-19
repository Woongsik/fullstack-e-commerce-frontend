import React from "react";
import { Routes, Route } from 'react-router-dom';
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
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Home />}></Route>
        <Route path="/products/:id" element={<Detail />}></Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
        <Route path="/cart/:id" element={<Cart />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
