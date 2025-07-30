import { useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Callback() {
    const { handleCallback } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        handleCallback().then(() => navigate('/')).catch((e) => {
            console.error(e);
            navigate('/?auth=error')
        });

    }, [handleCallback, navigate]);

    return <div>Completing login...</div>;
}