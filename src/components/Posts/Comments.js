import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { db } from '../../firebase';

import './Comments.css';
import { useStyles } from '../assests/Styles/Styles';

export default function Comments({ postId, user }) {
    const classes = useStyles();
    
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const postComment = (e) => {
        e.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('');
    };

    useEffect(() => {
        let unsubscribe;
        // Get the comments from the specified post using its ID
        if(postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        // 
        return () => {
            unsubscribe();
        }
        // Listens specifically to the postId
        // runs with each post (as the postId/post changes)
    }, [postId]);

    return (
        <div className="comment"> 

            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>

            {user && (
                <form className="comment__form" action="">
                    <input 
                        className="comment__input"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                    <button 
                        className="comment__post-button" 
                        // Disable button until user begins to type a comment
                        disabled={!comment}
                        variant="contained" 
                        onClick={postComment}
                    > Post
                    </button>       
                </form>
            )}
            
        </div>
    )
}
