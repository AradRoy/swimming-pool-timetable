import React from 'react';
import { FaBehance, FaEnvelope, FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';



export const links = [
    {
        id: 1,
        url: '/',
        text: 'Home',
    },
    {
        id: 2,
        url: '/athletes',
        text: 'Athletes',
    },
    /* {
        id: 3,
        url: '/coaches',
        text: 'Coaches',
    }, */
    {
        id: 4,
        url: '/timetable',
        text: 'Timetable',
    },
    /* {
        id: 5,
        url: '/about',
        text: 'About',
    }, */
];

export const social = [
    {
        id: 1,
        url: 'https://github.com/AradRoy/swimming-pool-timetable',
        icon: <FaGithub size={30} />,
    },
    {
        id: 2,
        url: 'https://www.linkedin.com/in/Roy-Arad/',
        icon: <FaLinkedin size={30} />,
    }
];