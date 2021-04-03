import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const StudentSidebarData = [
    {
        title: 'Profile',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName : 'nav-text01'
    },
    {
        title: 'Change Password',
        path: '/changepassword',
        icon: <AiIcons.AiFillLock />,
        cName : 'nav-text01'
    },

    {
        title: 'Marks',
        path: '/studentMarksAPI',
        icon: <AiIcons.AiFillSignal />,
        cName : 'nav-text01'
    },
    {
        title: 'Time Table',
        path: '/studentTimeTableAPI',
        icon: <AiIcons.AiFillClockCircle/>,
        cName : 'nav-text01'
    },
    {
        title: 'Documents',
        path: '/StudentDocumentsAPI',
        icon: <AiIcons.AiFillClockCircle/>,
        cName : 'nav-text01'
    },
    
    
]
