import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';
import { useAuth } from '../../contexts/AuthContext';

import './Auth.css';
import { useStyles } from './Styles';

export default function LogIn() {
    const classes = useStyles();

    // const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    // pull the login function directly from the auth file
    const { login, currentUser } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    // Use async to await the try catch block
    async function handleSubmit(e) {
        e.preventDefault();
        // try to sign in
        try {
            setError('');
            // loading so user does not create multiple accounts if button clicked multiple times
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            // If successful, redirect to feed
            history.push("/canvas");
        } catch {
            setError("Failed to sign in");
        }
        // done user creation loading 
        setLoading(false);
    }

    return (
        <div className="auth-container">
            <div className="auth">
                <center className="auth__center-title">
                    <img 
                        src={require('../../images/painting-palette-icon.png')} 
                        alt="" 
                        className="navbar__headerImage"
                    /> 
                    <h2>Log In</h2>
                </center>

                {currentUser && (
                    <center>
                        <h4>You are already logged in {currentUser.displayName}</h4>
                    </center>
                )}  

                {error && <div className="alert">{error}</div> }

                 <form className={classes.root} onSubmit={handleSubmit} autoComplete="on">
                    <Input
                        placeholder="email"
                        type="email"
                        ref={emailRef}
                        onChange={e => emailRef.current.value = e.target.value}
                        required
                    />
                    <Input
                        placeholder="password"
                        reuired
                        type="password"
                        ref={passwordRef}
                        onChange={e => passwordRef.current.value = e.target.value}
                    />
                    <center>
                       <Button disabled={loading} type="submit">Log In</Button>  
                    </center>
                   
                </form> 

                <div className="signup__login"> 
                <p>Don't have an account? <a href="/signup">Sign Up</a> </p>
                </div>

            </div>
        </div>
    )
}
