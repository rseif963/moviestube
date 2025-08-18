import React, { useEffect, useState } from 'react'
import './video.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';

const Video = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    const [videoUrl, setVideoURL] = useState("");
    const { id } = useParams();
    const [comments, setComments] = useState([]);

    const fetchVideoById = async () => {
        await axios.get('http://localhost:4000/api/getVideoById/${id}').then((response) => {
            console.log(response.data.video);
            setData(response.data.video)
            setVideoURL(response?.data?.video?.videoLink)
        }).catch(err => {
            console.log(err);
        })
    }

    const getCommentByVideoId = async () => {
        await axios.get('http://localhost:4000/commentApi/comment/${id}').then((response) => {
            console.log(response);
            setComments(response.data.comments)
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
    }, [])

    const handleComment = async()=>{
        const body = {
            "message":message,
            "video":id
        }
        await axios.post('http://localhost:4000/commentApi/comment',body,{ withCredentials: true }).then((resp)=>{
            console.log(resp)
            const newComment = resp.data.comment;
            setComments([newComment,...comments]);
            setMessage("")
        }).catch(err=>{
            toast.error("Please Login First to Comment")
        })
    }

    return (
        <div className="video">
            <div className="videoPostSection">
                <div className="video_moviestube">
                    {data && <video width="400" controls autoPlay className="video_moviestube_video">

                        <source src={videoUrl} type="video/mp4" />
                        <source src={videoUrl} type="video/webm" />
                        Your browser does not support the video tag
                    </video>}
                </div>
                <div className="video_moviestubeAbout">
                    <div className="video_moviestubeTitle">{data?.title}</div>
                    <div className="moviestube_video_ProfileBlock">
                        <div className="moviestube_video_ProfileBlock_left">
                            <Link to={'/user/${data?.user?._id}'} className="moviestube_video_ProfileBlock_left_img">
                                <img className="moviestube_video_ProfileBlock_left_image" src={data?.user?.profilePic} />
                            </Link>

                            <div className="moviestubeVideo_subsView">
                                <div className="moviestubePostProfileName"> {data?.user?.channelName} </div>
                                <div className="moviestubePostProfileSubs"> {data?.user?.createdAt.slice(0, 10)} </div>
                            </div>
                            <div className="subscribeBtnMoviestube">Subscribe</div>
                        </div>
                        <div className="moviestube_video_likeBlock">
                            <div className="moviestube_video_likeBlock_like">
                                <ThumbUpOffAltIcon />
                                <div className="moviestube_video_likeBlock_NoOfLikes">{data?.like}</div>
                            </div>
                            <div className="moviestubeVideoDivider"></div>
                            <div className="moviestube_video_likeBlock_like">
                                <ThumbDownOffAltIcon />
                            </div>
                        </div>
                    </div>
                    <div className="moviestube_video_About">
                        <div>{data?.createdAt.slice(0, 10)}</div>
                        <div>{data?.descripton}</div>
                    </div>
                </div>

                <div className="moviestubeCommentSection">
                    <div className="moviestubeCommentSectionTitle">{comments.length}Comments</div>
                    <div className="moviestubeSelfComment">
                        <img className="video_moviestubeSelfCommentProfile" src='https://ih1.redbubble.net/image.1380092762.9137/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg' />
                        <div className="addComment">
                            <input type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} className="addCommentInput" placeholder="Add a Comment" />
                            <div className="cancelSubmitComment">
                                <div className="cancelComment">Cancel</div>
                                <div className="cancelComment" onclick={handleComment}>Comment</div>
                            </div>
                        </div>
                    </div>
                    <div className="moviestubeOtherComments">
                        {
                            comments.map((item,index)=>{
                              return(
                                <div className="moviestubeSelfComment">
                                    <img className="video_moviestubeSelfCommentProfile" src={item?.user?.profilePic} />
                                    <div className="others_commentSection">
                                        <div className="others_commentSectionHeader">
                                            <div className="channelName_comment">{item?.user?.channelName}</div>
                                            <div className="commentTimingOthers">{item?.createdAt}.slice(0,10)</div>
                                        </div>
                                        <div className="otherCommentSectionComment">
                                             {item?.message}
                                        </div>
                                    </div>
                                </div>
                            );
                           })
                        }

                        <div className="moviestubeSelfComment">
                            <img className="video_moviestubeSelfCommentProfile" src="https://ih1.redbubble.net/image.1380092762.9137/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg" />
                            <div className="others_commentSection">
                                <div className="others_commentSectionHeader">
                                    <div className="channelName_comment">UserName</div>
                                    <div className="commentTimingOthers">2025-6-11</div>
                                </div>
                                <div className="otherCommentSectionComment">
                                    This is a cool Animation Movie
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="videoSuggestions">
                <div className="videoSuggestionsBlock">
                    <div className="video_suggestion_thumbnail">
                        <img src="https://i.ytimg.com/vi/ynTf1YFgDV0/maxresdefault.jpg" className="video_suggestion_thumbnail_img" />
                    </div>
                    <div className="video_suggestions_About">
                        <div className="video_suggestions_About_title">Top 10 Best Animation Movies To Watch In 2025 </div>
                        <div className="video_suggestions_About_Profile">User1</div>
                        <div className="video_suggestions_About_Profile">3 views . 1 day ago</div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Video