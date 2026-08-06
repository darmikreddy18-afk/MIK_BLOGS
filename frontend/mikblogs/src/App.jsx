import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Enter from './pages/home/enter.jsx'
import Home from './pages/home/home.jsx'
import Navbar from './common/navbar.jsx';
import Signup from './pages/signup/newuser.jsx';
import Login from './pages/login/olduser.jsx';
import Newblog from './pages/create/blog/newblog.jsx';
import ShowBlog from './pages/show/blog.jsx';
import EditBlog from "./pages/show/edit.jsx";
import Profile from "./pages/show/profile.jsx";
import Library from './pages/show/library.jsx';

function App() {


  return (
    <>
    
    <BrowserRouter>
    <Navbar></Navbar>
            <Routes>
                <Route path="/" element={
            <Enter />
        } />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                
                <Route path="/blogs" element={
            <Newblog />
        } />
                <Route path="/blogs/:id" element={<ShowBlog></ShowBlog>}/>
                <Route path="/blogs/:id/edit" element={
            <EditBlog />
      }/>
                <Route path="/user/:id" element={<Profile></Profile>}/>
                <Route
    path="/library"
    element={
        
            <Library />
        
    }
/>

            </Routes>
        </BrowserRouter>
      
    </>
  )
}

export default App
