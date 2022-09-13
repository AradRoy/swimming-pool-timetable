import React, { useRef, useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import logo from '../assets/logos/logo.png';
import { links, social } from './Links';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/esm/Container';

const NavBar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    const onUpdateActiveLink = (url) => setActiveLink(url)

    return (
        <>
            <Navbar collapseOnSelect expand="md" className={scrolled ? 'scrolled' : ''}>

                <LinkContainer to={links[0].url} className='ms-3'>
                    <Navbar.Brand>
                        <img
                            alt=""
                            src={logo}
                            width="100"
                            height="40"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                </LinkContainer>


                <Navbar.Toggle />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav activeKey={activeLink} className='ms-auto'>
                        {links.map((link) => {
                            const { id, url, text } = link;
                            return (
                                <Nav.Item key={id}>
                                    <LinkContainer to={url}>
                                        <Nav.Link
                                            className={activeLink === { url } ? 'active navbar-link' : 'navbar-link'}
                                            onClick={() => onUpdateActiveLink({ url })}>
                                            {text}
                                        </Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                            );
                        })}
                    </Nav>
                    <Nav className='ms-auto'>
                        <Stack direction="horizontal" gap={3}>
                            {social.map((socialIcon) => {
                                const { id, url, icon } = socialIcon;
                                return (
                                    <Nav.Item key={id}>
                                        <Nav.Link href={url} >{icon}</Nav.Link>
                                    </Nav.Item>
                                );
                            })}
                        </Stack>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        </>
    );
};

export default NavBar;

