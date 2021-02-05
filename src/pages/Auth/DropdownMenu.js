import React from 'react';
import { Link } from 'react-router-dom';
// import React, { useState } from 'react';
// import firebase from 'firebase';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase';

// import { UploadForm } from '../../components/Upload/Upload';
import './DropdownMenu.css';
// import { Dialog, DialogContent, DialogContentText, DialogTitle, Modal } from '@material-ui/core';


export default function DropdownMenu() {
    // Get the current user
    const { currentUser } = useAuth();

    return (
        <div className="menu-dropdown">
            <div className="feed-link">

                <span> {currentUser.displayName} &#9660; </span> 

                <div className="dropdown-content">

                    <div className="drop-link">
                        <Link className='Link' to='gallery'>My Gallery</Link>
                    </div>

                    <div className="drop-link">
                        <Link className='Link' to='feed'>Feed</Link>
                    </div>
                    {/* divider here */}
                    <div className="drop-link">
                        <Link className='Link' onClick={() => auth.signOut()}> logout </Link> 
                    </div>

                </div>
            </div>
        </div>
    )
}
