import React from 'react';
import './Navbar.css'; 

import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase';

export default function Nav() {
    const { currentUser } = useAuth();

    return (
        <div className="navbar-container">
            <div className="nav-search">
                <div className="searchbar">
                    <input id='search' type='text' placeholder='Search'/>
                </div>
            </div>
            <div className="nav-menu">
                <div className="item">
                    <a href="#/">About</a>
                </div>
                <div className="item">
                    <a href="/home">Home</a>
                </div>
                <div className="item">
                    <a href="/canvas">Canvas</a>
                </div>

                { currentUser ? (
                    <>
                    <div className="item">
                        <a href="#/">Username</a>
                    </div>
                    <div className="item">
                        <span onClick={() => auth.signOut()}> logout </span> 
                    </div>
                    </>
                ): (
                    <div className="feed-link">
                        <a href='/login'> Login </a> 
                    </div>
                ) }

            </div>
        </div>
    )
}
