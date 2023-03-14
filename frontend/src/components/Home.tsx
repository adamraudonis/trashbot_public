import { useState } from 'react';
import { supabase } from '../supabaseClient';
import React from 'react';
import './Home.scss';

export default function Home({ session }: any) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      console.log(data);

      if (error) throw error;
    } catch (error: any) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
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
  const signInOrLogOut = session ? <a href="/">Logout</a> : signIn;
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
        {signInOrLogOut}
      </div>
    </div>
  );
}
