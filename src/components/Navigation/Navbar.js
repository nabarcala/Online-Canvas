import './Navbar.css'; 
import React from 'react';
import { Link } from 'react-router-dom';
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
                    <Link className='Link' to='About'>About</Link>
                </div>
                <div className="item">
                    <Link className='Link' to='Home'>Home</Link>
                </div>
                <div className="item">
                    <Link className='Link' to='Canvas'>Canvas</Link>
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
                        <Link className='Link' to='Login'>Login</Link>
                    </div>
                ) }

            </div>
        </div>
    )
}
