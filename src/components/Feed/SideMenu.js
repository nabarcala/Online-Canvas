import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useStyles } from '../../parts/Avatars/Avatars';

import './SideMenu.css'; 
import { useAuth } from '../../../contexts/AuthContext';
import { auth } from '../../../firebase';

export default function SideMenu({username}) {
    const classes = useStyles();

    // Get the current user
    const { currentUser } = useAuth();
    
    return (
        <div className="menu">

            <div className="menu__header">
                <img 
                    src={require('../../../assests/images/painting-palette-icon.png')}
                    alt="" 
                    className="navbar__headerImage"
                /> 
                <div className="navbar__headerText">Natsketch</div>
            </div>

            <div className="menu__user">

            { currentUser ? (
                <>
                <Avatar 
                    // className="menu__avatar" 
                    id="menu__avatar"
                    className={classes.large}
                    // alt="fg"
                    // src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcnaca.ca%2Fwp-content%2Fuploads%2F2018%2F10%2Fuser-icon-image-placeholder.jpg&f=1&nofb=1"
                />

                {/* User avatar, name, and username */}
                <center>
                    <div className="menu__name">{currentUser.displayName}</div>
                    <div className="menu__username">{currentUser.email}</div>
                </center>

                {/* User Data: Followers, Following, Posts */}
                <div className="menu__user-data disabled">
                    <div className="user__posts">
                        <p>46</p>
                        <p className="user-data">Posts</p>
                    </div>
                    <div className="user__followers">
                        <p>46</p>
                        <p className="user-data">Followers</p>
                    </div>
                    <div className="user__following">
                        <p>46</p>
                        <p className="user-data">Following</p>
                    </div>
                </div>

                {/* Menu Directory */}
                <div className="menu__directory">
                <div className="menu__dir-feed disabled">
                        {/* <img src="" alt=""/> */}
                        <i className='bx bx-home-heart' ></i>
                        <h4>Feed</h4>
                    </div>
                    <div className="menu__dir-feed disabled">
                        {/* <img src="" alt=""/> */}
                        <i class='bx bx-home-smile' ></i>
                        <h4>Explore</h4>
                    </div>
                    <a href="/canvas" className="menu__dir-canvas">
                        {/* <img src="" alt=""/> */}
                        <i className='bx bx-palette' ></i>
                        <h4>Canvas</h4>
                    </a>
                    <div className="menu__dir-notif disabled">
                        {/* <img src="" alt=""/> */}
                        <i className='bx bx-bell'></i>
                        <h4>Notifications</h4>
                    </div>
                    <div className="menu__dir-settings disabled">
                        {/* <img src="" alt=""/> */}
                        <i class='bx bx-cog'></i>
                        <h4>Settings</h4>
                    </div>

                    {/* Login and Logout Buttons */}
                    <div className="menu__auth">
                        <div className="menu__logout">
                            <i className='bx bx-log-out-circle' ></i>
                            <h4 onClick={() => auth.signOut()}>Log Out</h4>
                        </div>
                    </div>
                </div>

                </>
            ):(
                <>
                {/* Menu Directory */}
                <div className="menu__directory offline-menu">
                    <center>
                        <img 
                            src={require('../../../assests/images/painting-palette-icon.png')}
                            alt="" 
                            className="navbar__headerImage-large"
                        /> 
                    </center>
                    <div className="join-now">
                        <h4>Join now to start following your favorite artists!
                            Use our canvas to create amazing artwork, then post them for 
                            all your friends to see!
                        </h4>
                    </div>
                    <div href="/signup" className="menu__dir-signup">
                        <h4>Want to join? <a href="/signup">Sign Up</a></h4>
                    </div>
                    <div href="/login" className="menu__dir-login">
                        <h4>Already have an account? <a href="/login">Log In</a> </h4>
                    </div>
                    <a href="/canvas" className="menu__dir-canvas offline-menu">
                        {/* <img src="" alt=""/> */}
                        <i className='bx bx-palette' ></i>
                        <h4>Check out our online canvas!</h4>
                    </a>
                </div>
                </>
            )}

            
            </div>
        </div>
    )
}
