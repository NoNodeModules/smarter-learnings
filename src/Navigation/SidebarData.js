import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName : 'nav-text01'
    },
    {
        title: 'About',
        path: '/about',
        icon: <IoIcons.IoIosPaper />,
        cName : 'nav-text01'
    },
    {
        title: 'Contact',
        path: '/contact',
        icon: <AiIcons.AiOutlineContacts />,
        cName : 'nav-text01'
    },
    {
        title: 'Courses',
        path: '/usercourses',
        icon: <AiIcons.AiOutlineBook />,
        cName : 'nav-text01'
    },
    {
        title: 'Jobs',
        path: '/userjob',
        icon: <AiIcons.AiOutlineBook />,
        cName : 'nav-text01'
    }

    
]
