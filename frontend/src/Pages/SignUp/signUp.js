import React, { useState } from 'react'
import './signUp.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Link,useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const SignUp = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState("https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg");
    const [signUpField, setSignUpField] = useState({ "channelName": "", "userName": "", "password": "", "about": "", "profilePic": uploadedImageUrl });
    const [progressBar,setProgressBar] = useState(false);
    const navigate = useNavigate();
    const handleInputField = (event, name) => {
        setSignUpField({
            ...signUpField, [name]: event.target.value
        })
    }
    console.log(signUpField)

    const uploadImage = async (e) => {
        console.log("Uploading")
        const files = e.target.files
        const data = new FormData();
        data.append('file', files[0]);
        // moviestube
        data.append('upload_preset', 'moviestube');

        try {
            // cloudName="dtjwo8yff"
            setProgressBar(true)
            const response = await axios.post("https://api.cloudinary.com/v1_1/dtjwo8yff/image/upload", data)
            setProgressBar(false)
            const imageUrl = response.data.url;
            setUploadedImageUrl(imageUrl);
            setSignUpField({
                ...signUpField, "profilePic": imageUrl
            })
        } catch (err) {
            console.log(err)
        }
    }
    const handleSignup = async () => {
        setProgressBar(true);
        axios.post('http://localhost:4000/auth/signUp', signUpField).then((res) => {
            
            toast.success(res.data.message)
            setProgressBar(false)
            navigate('/');
        }).catch(err => {
            console.log(err)
            setProgressBar(false)
            toast.error(err)
        })
    }


    return (
        <div className="signUp">
            <div className="signup_card">
                <div className="signUp_title">
                    <PlayCircleIcon sx={{ fontSize: "45px" }} className="signup_moviestubeImage" />
                    Signup
                </div>
                <div className="signUp_Inputs">
                    <input type="text" className="signUp_Inputs_inp" value={signUpField.channelName} onChange={(e) => { handleInputField(e, "channelName") }} placeholder="Channel Name" />
                    <input type="text" className="signUp_Inputs_inp" value={signUpField.userName} onChange={(e) => { handleInputField(e, "userName") }} placeholder="User Name" />
                    <input type="password" className="signUp_Inputs_inp" value={signUpField.password} onChange={(e) => { handleInputField(e, "password") }} placeholder="Passweord" />
                    <input type="text" className="signUp_Inputs_inp" value={signUpField.about} onChange={(e) => { handleInputField(e, "about") }} placeholder="About Your Channel" />

                    <div className="image_upload_signup">
                        <input type="file" onChange={(e) => uploadImage(e)} />
                        <div className="image_upload_signup_div">
                            <img className="image_default_signup" src={uploadedImageUrl} />
                        </div>

                    </div>
                    <div className="signUpBtns">
                        <div className="signUpBtn" onClick={handleSignup}>SignUp</div>
                        <Link to={'/'} className="signUpBtn">Home Page</Link>
                    </div>

                    {progressBar && <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>}

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignUp