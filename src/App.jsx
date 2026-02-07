import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbarr from "./navbar/Navbarr";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home"
import Products from "./components/Products"
import Contact from "./components/Contact"
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CardDetails from "./components/CardDetails";
import PageNotFound from "./components/PageNotFound";
import { useLocation } from "react-router-dom";

const App = () => {
   const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";
  return (
    <div>
      {!hideNavbar && <Navbarr />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
         <Route path="/products/:id" element={<CardDetails />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
