import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Service from "../pages/Service";
import TourManagement from "../admin/pages/TourManagement";
import History from "../pages/History";
import AccountManagement from "../admin/pages/AccountManagement";
import BookingManagement from "../admin/pages/BookingManagement";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BookingForm from "../component/booking-form/BookingForm";
import ProfileUpdate from "../pages/ProfileUpdate";

const Routers = () => {
    return(
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/tour/:id" element={<TourDetails />} />
            <Route path="/tour/booking-form/:id" element={<BookingForm/>}/>
            <Route path="/history" element={<History/>} />
            <Route path="/profile" element={<ProfileUpdate/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service" element={<Service />} />
            <Route path="/admin" element={<TourManagement />} />
            <Route path="/admin/tour" element={<TourManagement />} />
            <Route path="/admin/account" element={<AccountManagement />} />
            <Route path="/admin/booking" element={<BookingManagement />} />

        </Routes>
    )
}

export default Routers;