import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import BookDetail from './components/bookDetail';
import CartDetail from './components/cartDetail';

function App() {

  const [searchData, setSearchData] = useState("");
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
  }, [searchData]);

  const handleSearch = (searchTerm) => {
      setSearchData(searchTerm);
  };

  const handleAddToCart = (item, quantity) => {
    // Kiểm tra xem mặt hàng đã có trong giỏ chưa
    const existingItemIndex = cartData.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // Nếu mặt hàng đã có trong giỏ, cập nhật số lượng
      const updatedCart = [...cartData];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartData(updatedCart);
    } else {
      // Nếu mặt hàng chưa có trong giỏ, thêm vào
      setCartData((prevCart) => [...prevCart, { ...item, quantity }]);
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartData.filter((item) => item.id !== itemId);
    setCartData(updatedCart);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartData.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartData(updatedCart);
  };

  useEffect(() => {
  }, [cartData]);

  return (
    <>
      <Router>
        <>
          <Header onSearch={handleSearch} quantity={cartData.length} />

          <Routes>
            <Route path="/search/:searchTerm" element={<Home searchData={searchData} />} >
            </Route>
            <Route path="/book/:id" element={<BookDetail onAddToCart={handleAddToCart} />}>
            </Route>
            <Route path="/cart" element={<CartDetail cartData={cartData} onRemoveItem={handleRemoveItem} onUpdateQuantity={handleUpdateQuantity} />}>
            </Route>
            <Route path="/" element={<Home searchData={""} />}>
            </Route>
          </Routes>

          <Footer />
        </>
      </Router>
    </>
  );
}

export default App;
