import { useState } from 'react';
import { supabase } from '../supabaseClient';
import React from 'react';
import './Home.scss';

export default function Home({ session, isAdmin }: any) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data, error }: any = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      console.log(data);
      const updates = {
        created_at: new Date(),
        email: data.email,
        name: data.name,
        user_id: data.id,
      };
      await supabase.from('profiles').upsert(updates);

      if (error) throw error;
    } catch (error: any) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    await supabase.auth.signOut();
  };

  const userWelcome = session ? <div>Welcome {session.user.email}!</div> : null;
  const signIn = loading ? (
    'Logging In...'
  ) : (
    <button
      type="button"
      onClick={handleLogin}
      className="login-with-google-btn"
    >
      Sign in with Google
    </button>
  );
  // TODO
  const signInOrLogOut = session ? (
    <div>
      <br />
      <button onClick={signOutUser}>Logout</button>
    </div>
  ) : (
    signIn
  );
  const controlsLink = session ? (
    <div>
      <a href="/controls">Controls</a>
      <br />
      <br />
    </div>
  ) : null;
  const selectUserLink = session ? (
    <div>
      <a href="/admin">Admin</a>
    </div>
  ) : null;
  // If is admin
  // - control robot
  // - get list of users
  // - select user to control
  // If is regular user
  // - control robot link if allowed
  return (
    <div>
      <div>
        <h1 className="header">Trashbot</h1>
        {userWelcome}
        {controlsLink}
        {selectUserLink}
        {signInOrLogOut}
      </div>
    </div>
  );
}
