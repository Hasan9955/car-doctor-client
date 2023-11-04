import { createContext, useEffect, useState } from "react";
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = ( ) =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const facebookSignIn =() => {
        return signInWithPopup(auth, facebookProvider)
    }

    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {

            const userEmail = currentUser?.email || user?.email;
            const currentEmail = { email: userEmail }
            setUser(currentUser);
            console.log('current user', currentUser);

            // if current user exist then issue a token
            if (currentUser) {
                axios.post('https://car-doctor-server-xi-seven.vercel.app/jwt', currentEmail, { withCredentials: true })
                    .then(res => {
                        console.log(res.data)
                    })
            } else {
                axios.post('https://car-doctor-server-xi-seven.vercel.app/logOut', currentEmail, { withCredentials: true })
                    .then(res => {
                        console.log(res.data)
                    })
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [user?.email])


    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        facebookSignIn,
        googleSignIn
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;