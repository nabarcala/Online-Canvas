import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true); 
    
    function signup(username, email, password) {
        return auth
                .createUserWithEmailAndPassword(email, password)
                .catch((error) => alert(error.message))
                .then(function(authUser) {
                    authUser.user.updateProfile({
                        displayName: username
                    })
                })
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        // Be able to unsubscribe from the on Auth State Change listener whenever this component is unmounted
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            // stop loading once a user is found and set
            // this allows the children to be rendered after we are done loading
            setLoading(false);
        })
        return unsubscribe
    }, [])

    // Pass along all the relevent information and values to the children
    const value = {
        currentUser,
        signup, 
        login
    };

    return (
        <AuthContext.Provider value={value}>
            {/* If we are not loading, then render the children */}
            {!loading && children}
        </AuthContext.Provider>
    )
}
