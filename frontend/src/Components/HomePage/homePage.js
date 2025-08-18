import React,{useEffect,useState} from 'react'
import './homePage.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
const HomePage = ({sideNavbar}) =>{
    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:4000/api/allVideo').then(res=>{
            console.log(res.data.videos)
            setData(res.data.videos);
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const options = ["All","Action","Horror","Sci-Fi","Drama","Animation","Comedy"]

    return(
        <div className={sideNavbar?"homePage":'fullHomePage'}>
            <div className="homePage_options">
                {
                    options.map((item, index) => {
                        return (
                            <div key={index} className="homePage_option">
                                {item}
                            </div>
                        );
                    })
                }
            
            </div>
            
            <div className={sideNavbar?"home_mainPage":"home_mainPageWithoutLink"}>

                {
                    data?.map((item,ind)=>{
                        return(

                          <Link to={ '/watch/${item._id}'} className="moviestube_video">
                           <div className="moviestube_thumbnailBox">
                             <img src={item.thumbnail} alt="thumbnail" className="moviestube_thumbnailPic" />
                             <div className="moviestube_timingThumbnail">
                               1:44
                             </div>
                           </div>
                           <div className="moviestubeTitleBox">
                               <div className="moviestubeTitleBoxProfile">
                                  <img src={item?.user?.profilePic} alt="profle" className="moviestube_thumbnail_Profile" />
                                </div>
                                <div className="moviestubeTitle_Title">
                                   <div className="moviestube_videoTitle">{item?.title}</div>
                                   <div className="moviestube_channelName">{item?.user?.channelName}</div>
                                   <div className="moviestubeVideo_views">{item?.likes} Likes</div>
                                </div>
                            </div>
                         </Link>
                        
                       );
                    })
                }


            </div>

        </div>
    )
}

export default HomePage