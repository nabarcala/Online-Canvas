import React from 'react';
// import Avatar from '@material-ui/core/Avatar';

import './Post.css';
// import { useStyles } from '../assests/Styles/Styles';
// import { db } from '../../../firebase';
// import Comments from './Comments';

export default function Posts({ imageUrl }) {
// export default function Posts({ postId, user, username, caption, imageUrl }) {
    // const classes = useStyles();
 
    return (
        <div className="post">

            {/* <div className="image"> */}
                <img src={imageUrl} alt=""/>  
            {/* </div> */}
            {/* <div className="text">Test</div> */}

            {/* Header -> Avatar + username */}
            {/* <div className="post__header">
                <Avatar 
                    className={classes.medium}
                    alt={username}
                    // src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcnaca.ca%2Fwp-content%2Fuploads%2F2018%2F10%2Fuser-icon-image-placeholder.jpg&f=1&nofb=1"
                />
                <h3 className="post__username">{username}</h3> 
            </div> */}

            {/* <div className="image">
                <img src={imageUrl} alt=""/>  
            </div> */}
            
            {/* <h3 className="post__username">{username}</h3>  */}

            {/* <div className="post__likes">
                ...
            </div>  */}

            {/* Only display caption if the user has provided one */}
            {/* { caption !== "" && (
                <div className="post__caption">
                    <h4><strong>{username}</strong>  {caption}</h4>
                </div>
            )}

            <div className="post__comments">
                <Comments postId={postId} user={user}/>
            </div> */}
            
        </div>
    )
}
