
import './App.css';
import Navbar from './Components/Navbar/navbar';
import Home from './Pages/Home/home';
import Video from './Pages/Video/video';
import { useState,useEffect } from 'react';
import {Route,Routes} from 'react-router-dom';
import Profile from './Pages/Profile/profile';
import VideoUpload from './Pages/VideoUpload/videoUpload';
import SignUp from './Pages/SignUp/signUp';
import axios from 'axios';
function App() {
  const [sideNavbar,setSideNavbar] = useState(true);

 useEffect(()=>{
    axios.get('https://moviestube-lime.vercel.app/').then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  const setSideNavbarFunc=(value)=>{
    setSideNavbar(value) 
  }
  return (
    <div className="App">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />
      <Routes>
        <Route path='/' element={<Home sideNavbar={sideNavbar} />} />
        <Route path='/watch/:id' element={<Video />} />
        <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar} />} />
        <Route path='/:id/upload' element={<VideoUpload />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes> 
      
    </div>
  );
}

export default App;
 
