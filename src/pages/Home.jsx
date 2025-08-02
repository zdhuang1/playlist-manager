import { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { getUserPlaylists, getUserData } from '../api/spotifyClient';
import logo from '../logo.svg';

import styles from './Home.module.css';

export default function Home() {
  const { token, startLogin } = useAuth();
  const [profile, setProfile] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null);


  useEffect(() => {
    if (!token) return;
    getUserData(token).then(setProfile).catch(console.error);
  }, [token]);

  useEffect(() => {
    if (!token || !profile) return;
    getUserPlaylists(token, profile.id)
      .then((data) => setUserPlaylists(data || {items: []}))
      .catch(console.error);
  }, [token, profile]);

/*
  useEffect(() => {
    if (!token) return;
    async function fetchTracks() {
      const tracks = await getTopTracks(token);
      setTopTracks(tracks || []);
    }
    fetchTracks();
  }, [token]);

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
*/

  if (!token) return <button onClick={startLogin}>Log in With Spotify</button>;
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <img src={logo} className={styles.App_logo} alt="logo" />
        <h1>Hello, {profile.display_name}</h1>
        <p>Welcome to my playlist manager!</p>
        <h2>Your playlists:</h2>
        {userPlaylists && userPlaylists.items ? (
          userPlaylists.items.map((playlist) => (
            <p key={playlist.name}>{playlist.name}</p>
          ))
        ) : (
          <div>Loading playlists...</div>
        )}
      </header>
    </div>


  );
}