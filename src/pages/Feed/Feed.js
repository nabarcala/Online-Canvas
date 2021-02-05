import React, { useState, useEffect } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { db } from '../../firebase';

import Post from '../../components/Posts/Post';
import { useAuth } from '../../contexts/AuthContext';
import './Feed.css'; 


export default function Feed() {
    // pull the current user 
    const { currentUser } = useAuth();

    // const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    // const [modalStyle] = React.useState(getModalStyle);

    const [posts, setPosts] = useState([]); 

    
    // const [open, setOpen] = useState(false);

    // Run a piece of code based on a specific condition
    useEffect(() => {
        // every time data changes in the database, take a snapshot and fire this piece of code
        // console.log(db.ref('posts'))
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            // map through all the items in the docs and get their properties
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        });
    }, [posts]) // run every single time posts change
    return (
        <div className="feed">
            {/* <Router> */}

                <GridList cellHeight={400} cols={4}>
                    {posts.map(({id, post}) => (
                        <GridListTile cols={2}> 
                            <Post 
                                key={id}
                                postId={id}
                                user={currentUser}
                                username={post.username}
                                imageUrl={post.imageUrl}
                            />
                        </GridListTile> 
                    ))}
                </GridList>



                <div className="feed-container">

                    <div className="gallery-container">
                        {/* {posts.map(({id, post}) => (
                            <Post 
                                key={id}
                                postId={id}
                                user={currentUser}
                                username={post.username}
                                imageUrl={post.imageUrl}
                            />
                        ))} */}
                    </div>

                </div>
                
                    {/* <div className="feed__container">
                        <div className="post__container">
                            {posts.map(({id, post}) => (
                                <div className="post__item">
                                    <Post 
                                        key={id}
                                        postId={id}
                                        user={currentUser}
                                        username={post.username}
                                        caption={post.caption}
                                        imageUrl={post.imageUrl}
                                    />
                                </div>
                            ))}
                        </div> 
                    </div> */}


                            
            {/* </Router> */}
            
        </div>
    )
}
