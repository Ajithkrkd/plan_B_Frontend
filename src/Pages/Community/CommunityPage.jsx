import React, { useState } from 'react';
import Header from '../../Components/Header/Header';
import SideBar from '../../Components/SideBar/SideBar';
import ChatRoom from '../../Components/chat/ChatRoom';
import { Opacity } from '@mui/icons-material';

const CommunityPage = () => {




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
