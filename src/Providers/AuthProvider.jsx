import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';

export const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Get the ID token and store it in localStorage
                const token = await currentUser.getIdToken();
                localStorage.setItem('access-token', token);
            } else {
                // Remove token when user is not authenticated
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};