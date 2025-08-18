import React,{useState, useEffect} from 'react'
import './navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import {Link,useNavigate} from 'react-router-dom';
import Login from '../Login/login';
import axios from 'axios';
const Navbar = ({setSideNavbarFunc,sideNavbar}) => {
    const [userPic,setUserPic] = useState("https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg")
    const [navbarModal,setNavbarModal] = useState(false);
    const [login,setLogin] = useState(false);
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const hanleClickModal =()=>{
        setNavbarModal(prev=>!prev);
    }
    const sideNavbarFunc=()=>{
        setSideNavbarFunc(!sideNavbar)
    }
    const handleprofile = () =>{
        let userId = localStorage.getItem("userId")
        navigate('/user/${userId}');
        setNavbarModal(false);
    }
    const  setLoginModal=()=>{
        setLogin(false);
    }
    const onClickOfPopUpOption =(button)=>{
        setNavbarModal(false);
        
        if(button==="login"){
          setLogin(true);
        }else{
            localStorage.clear();
            getLogoutFun();
            setTimeout(() => {
                navigate('/')
                window.location.reload();
            }, 2000);
        }
    }

    const getLogoutFun = async()=>{
        axios.post("http://localhost:4000/auth/logout",{},{ withCredentials: true }).theb((res)=>{
            console.log("Logout")
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        let userProfilePic = localStorage.getItem("userProfilePic");
        setIsLoggedIn(localStorage.getItem("userId")!==null?true:false);
        if(userProfilePic!==null){
            setUserPic(userProfilePic)
        }
    },[])

    return (
        <div className='navbar'>
            <div className="navbar-left">
                <div className="navbarHamberger" onClick={sideNavbarFunc}>
                    <MenuIcon sx={{color:"white"}} />
                </div>
                <Link to={'/'} className="navbar_logoImg">
                    <PlayCircleIcon sx={{fontSize: "34px"}} className='navbar_logoImage' />
                    <div className='navbar_logoTitle'>MoviesTube</div>
                </Link>
            </div>
            <div className="navbar-middle">
                <div className="navbar-searchBox">
                    <input type='text' placeholder='Search' className='navbar_searchBoxInput' />
                    <div className="navbar_searchIconBox"><SearchIcon sx={{ fontSize: "28px",color:"white" }} /></div>
                </div>
                <div className="navbar-mic">
                    <MicIcon sx={{color: "white"}} />
                </div>
            </div>
            <div className="navbar-right">
                <Link to={'/763/upload'}>
                   <VideoCallIcon sx={{fontSize: "30px",cursor:"pointer",color:"white"}} />
                </Link>
                <NotificationsIcon sx={{fontSize: "30px",cursor:"pointer",color:"white"}} />
                <img onClick={hanleClickModal} src={userPic} className='navbar-right-logo' alt='Logo' />

                { navbarModal &&
                  <div className="navbar-modal">
                    {isLoggedIn && <div className="navbar-modal-option" onClick={handleprofile}>Profile</div>}
                    
                    {isLoggedIn && <div className="navbar-modal-option" onClivk={()=>onClickOfPopUpOption("logout")}>Logout</div>}
                    {!isLoggedIn && <div className="navbar-modal-option" onClick={()=>onClickOfPopUpOption("login")}>Login</div>}
            
                  </div>
                }
            </div>

            {
              login && <Login setLoginModal={setLoginModal} />
            }
        </div>
    )
}

export default Navbar
