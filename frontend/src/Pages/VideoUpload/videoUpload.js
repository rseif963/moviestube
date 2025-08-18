import React,{useState,useEffect } from 'react'
import './videoUpload.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const VideoUpload = () =>{
    const[inputField,setInputField] = useState({"title":"","description":"","videoLink":"","thumbnail":"","videoType":""})
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const handleOnChangeInput =(event,name)=>{
        setInputField({
            ...inputField,[name]:event.target.value
        })
    }


    const uploadImage = async (e,type)=>{
        setLoader(true)
        console.log("Uploading")
        const files = e.target.files;
        const data = new FormData();
        data.append('upload_preset', 'moviestube');
        try{
            // cloudName="dtjwo8yff"
            const response = await axios.post('https://api.cloudinary.com/v1_1/dtjwo8yff/${type}/upload'.data)
            const url = response.data.url;
            setLoader(false)
            let val = type==="image"?"thumbnail":"videoLink";
            setInputField({
                ...inputField,[val]:url
            })
            
        }catch(err){
            setLoader(false)
            console.log(err)
        }
    }
    console.log(inputField)

    useEffect(()=>{
        let isLogin = localStorage.getItem("userId");
        if(isLogin===null){
            navigate('/')
        }
    },[])

    const handleSubmitFunc = async()=>{
        setLoader(true)
        await axios.post('http://localhost:4000/api/video',inputField,{ withCredentials: true }).then((resp)=>{
            console.log(resp)
            setInputField(false)
            navigate('/')
        }).catch(err=>{
            console.log(err)
            setInputField(false)
        })
    }

    return(
        <div className="videoUpload">
            <div className="uploadBox">
                <div className="uploadVideoTitle">
                    <PlayCircleIcon sx={{ fontSize: "54px", color:"lightskyblue" }} />
                    Upload Video
                </div>
                <div className="uploadForm">
                    <input type="type" value={inputField.title} onChange={(e)=>{handleOnChangeInput(e,"title")}} placeholder="Video Title" className="uploadFormInputs" />
                    <input type="type" value={inputField.description} onChange={(e)=>{handleOnChangeInput(e,"description")}} placeholder="Description" className="uploadFormInputs" />
                    <input type="type" value={inputField.videoType} onChange={(e)=>{handleOnChangeInput(e,"videoType")}} placeholder="Category" className="uploadFormInputs" />
                    <div>Thumbnail <input type="file" accept="image/*" onChange={(e)=>uploadImage(e,"image")} /></div>
                    <div>Video <input type="file" accept="video/mp4, video/webm, video/*" onChange={(e)=>uploadImage(e,"video")} /></div> 
                
                {
                    loader && <Box sx={{ display: "flex"}}>
                                  <CircularProgress />
                              </Box>
                }
                </div>
                <div className="uploadBtns">
                    <div className="uploadBtn-form" onClick={handleSubmitFunc} >Upload</div>
                    <Link to={'/'} className="uploadBtn-form">Home</Link>
                </div>
            </div>
        </div>
    )
}

export default VideoUpload