// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    // Replace with your own authentication verification endpoint
                    const response = await axios.get('http://localhost:8080/api/users/verify-token', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setIsAuthenticated(response.data.isAuthenticated);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error verifying token', error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return { isAuthenticated };
};
