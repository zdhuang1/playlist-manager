import { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { getMe, getTopTracks } from '../api/spotifyClient';
import logo from '../logo.svg';

import styles from './Home.module.css';

export default function Home() {
  const { token, startLogin } = useAuth();
  const [profile, setProfile] = useState(null);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    if (!token) return;
    getMe(token).then(setProfile).catch(console.error);
  }, [token]);

  useEffect(() => {
    if (!token) return;
    async function fetchTracks() {
      const tracks = await getTopTracks(token);
      setTopTracks(tracks || []);
    }
    fetchTracks();
  }, [token]);

  if (!token) return <button onClick={startLogin}>Log in With Spotify</button>;
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className={styles.App}>
        
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello, {profile.display_name}</h1>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
        <p>Here are your top tracks:</p>
        <ul>
          {topTracks.map(track => (
            <li key={track.id}>
              {track.name} by {track.artists.map(artist => artist.name).join(', ')}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}