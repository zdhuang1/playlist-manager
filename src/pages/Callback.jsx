import { useRef, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Callback() {
    const { handleCallback } = useAuth();
    const navigate = useNavigate();
    const called = useRef(false); // Gaurd against double execution

    useEffect(() => {
      if (called.current) return;
      called.current = true;
      handleCallback().then(() => navigate('/')).catch((e) => {
          console.error(e);
          navigate('/?auth=error')
      });
    }, [handleCallback, navigate]);

    return <div>Completing login...</div>;
}