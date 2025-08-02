import { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { getUserPlaylists, getUserData } from '../api/spotifyClient';
import logo from '../logo.svg';

import styles from './Home.module.css';

export default function Home() {
  const { token, startLogin } = useAuth();
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!token) return;
    async function fetchData() {
      try {
        const userData = await getUserData(token);
        const playlists = await getUserPlaylists(token);
        setProfile(userData);
        setPlaylists(playlists.items);
      } catch (err) {
        setError(err.message);
      }
    }

    if (token) {
      fetchData();
    }
  }, [token]);

  if (error) return <div>Error: {error}</div>
  if (!token) return <button onClick={startLogin}>Log in With Spotify</button>;
  if (!profile || playlists.length === 0) return <div>Loading...</div>;

  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <img src={logo} className={styles.App_logo} alt="logo" />
        <h1>Hello, {profile.display_name}</h1>
        <p>Welcome to my playlist manager!</p>
        <h2>Your playlists:</h2>
        {playlists ? (
          playlists.map((playlist) => (
            <li key={playlist.id}>{playlist.name}</li>
          ))
        ) : (
          <div>Loading playlists...</div>
        )}
      </header>
    </div>


  );
}