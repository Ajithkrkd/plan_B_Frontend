import React, { useState } from 'react';
import Header from '../../Components/Header/Header';
import SideBar from '../../Components/SideBar/SideBar';
import ChatRoom from '../../Components/chat/ChatRoom';
import { Opacity } from '@mui/icons-material';

const CommunityPage = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageXOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    // Background image style for the outer container
    const outerDivStyle = {
        backgroundImage: `url('/src/assets/devops_index-hero.avif')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover', // Optional: Adjust background size as needed
    };



    return (
        <>
            <Header />
            <SideBar />
            <div >
               
          
                    <ChatRoom />
           
            </div>
        </>
    );
};

export default CommunityPage;
