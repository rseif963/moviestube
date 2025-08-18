import React from 'react'
import './sideNavbar.css'
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ContentCutIcon from '@mui/icons-material/ContentCut';
const SideNavbar = ({sideNavbar}) =>{
    return (
        <div className={sideNavbar?"home-sideNavbar":"homeSideNavbarHide"}>
            <div className="home_sideNavbarTop">
                <div className={'home_sideNavbarTopOption'}>
                    <HomeIcon />
                    <div className="home_sideNavbarTopOptionTitle">Home</div>
                </div>
                <div className={'home_sideNavbarTopOption'}>
                    <SubscriptionsIcon />
                    <div className="home_sideNavbarTopOptionTitle">Subscriptions</div>
                </div>
            </div>

            <div className="home_sideNavbarMiddle">
                <div className={'home_sideNavbarTopOption'}>
                    <div className="home_sideNavbarTopOptionTitle">You</div>
                    <ChevronRightIcon />
                </div>
                <div className={'home_sideNavbarTopOption'}>
                    <RecentActorsIcon />
                    <div className="home_sideNavbarTopOptionTitle">Your Channel</div>
                </div>
                <div className={'home_sideNavbarTopOption'}>
                    <HistoryIcon />
                    <div className="home_sideNavbarTopOptionTitle">History</div>
                </div>
                <div className={'home_sideNavbarTopOption'}>
                    <PlaylistPlayIcon />
                    <div className="home_sideNavbarTopOptionTitle">Playlist</div>
                </div>
                <div className={'home_sideNavbarTopOption'}>
                    <VideoLibraryIcon />
                    <div className="home_sideNavbarTopOptionTitle">Your Videos</div>
                </div>
                <div className={'home_sideNavbarTopOption'}>
                    <WatchLaterIcon />
                    <div className="home_sideNavbarTopOptionTitle">Watch Later</div>
                </div>
                <div className={'home_sideNavbarTopOption'}>
                    <ThumbUpOffAltIcon />
                    <div className="home_sideNavbarTopOptionTitle">Liked Videos</div>
                </div>
                <div className={'home_sideNavbarTopOption'}>
                    <ContentCutIcon />
                    <div className="home_sideNavbarTopOptionTitle">Your Clips</div>
                </div>
            </div>

            <div className="home_sideNavbarMiddle">
                <div className="home_sideNavbarTopOption">
                    <div className="home_sideNavbarTopOptionTitleHeader">Subscriptions</div> 
                </div>
            
                <div className="home_sideNavbarTopOption">
                  <img className="home_sideNavbar_ImgLogo" src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" alt="" />
                  <div className="home_sideNavbarTopOptionTitle">Rashid Seif</div>
               </div>
            </div>
        </div>
    )
}

export default SideNavbar