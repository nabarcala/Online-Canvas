import React from 'react';
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

                <span> {currentUser.email} &#9660; </span> 

                <div className="dropdown-content">

                    {/* <div className="drop-link">
                        <input id="post" type="file" onChange={uploadHandler} accept="image/x-png,image/gif,image/jpeg" /> 
                        <label htmlFor="post" id="post-label" > Post an Outside Image </label>  
                    </div> */}

                    <div className="drop-link">
                        <a href='/gallery'> My Gallery </a> 
                    </div>

                    <div className="drop-link">
                        <a href='/feed'> Feed </a> 
                    </div>

                    {/* divider here */}
                    <div className="drop-link">
                        <a href='#/' onClick={() => auth.signOut()}> logout </a> 
                    </div>

                </div>

                {/* <Modal
                    className="modal"
                    open={true}
                    // onClose={handleClose}
                    // aria-labelledby="simple-modal-title"
                    // aria-describedby="simple-modal-description"
                >
                    <p>body test</p>
                </Modal> */}

                {/* <Dialog 
                    open={open} 
                    onClose={handleClose} 
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle> Save Your Drawing </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <p>Save your drawing to your personal gallery to continue it later,
                                or post it online to share it with others.
                            </p>
                        </DialogContentText>
                        <div className="image-preview">
                            { file && <img src={src} width="200px" /> }
                            { file && <p> { file.name } </p> }
                        </div>
                        <div className="image-details">
                            <div className="detail-input">
                                <label htmlFor="title">Title</label>
                                <input id="caption" type="text" placeholder="Title" onChange={(e) => setTitle(e)}/>
                            </div>
                            <div className="detail-input">
                                <label htmlFor="caption">Caption</label>
                                <textarea id="caption" type="text" rows="5" placeholder="Caption" onChange={(e) => setCaption(e)} />
                            </div>
                            <a href="">Save</a>
                        </div>
                    </DialogContent>
                </Dialog> */}
            </div>

            

        </div>
    )
}
