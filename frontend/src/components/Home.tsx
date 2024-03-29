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

      const { error }: any = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

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
  const userWelcome = session ? (
    <div className="subtitle">Welcome {session.user.user_metadata.name}!</div>
  ) : null;
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
      <button className="logoutButton" onClick={signOutUser}>
        Logout
      </button>
    </div>
  ) : (
    signIn
  );
  const controlsLink = session ? (
    <button
      className="button"
      onClick={() => {
        window.location.href = '/controls';
      }}
    >
      Controls
    </button>
  ) : null;
  const selectUserLink =
    session && isAdmin ? (
      <div>
        <br />
        <button
          className="button"
          onClick={() => {
            window.location.href = '/admin';
          }}
        >
          Admin
        </button>
      </div>
    ) : null;
  // If is admin
  // - control robot
  // - get list of users
  // - select user to control
  // If is regular user
  // - control robot link if allowed
  // return (
  //   <div
  //     className="trashbot-container"
  //     style={{ backgroundImage: `url(/trashbot.jpeg)` }}
  //   >
  //     <h1 className="trashbot-title">Trashbot</h1>

  //   </div>
  // );
  const trashbotImage = '/trashbot.jpeg';
  return (
    <div
      className="backgroundImage"
      style={{ backgroundImage: `url(${trashbotImage})` }}
    >
      <h1 className="title">Trashbot</h1>
      {userWelcome}
      {controlsLink}
      {selectUserLink}
      {signInOrLogOut}
    </div>
  );
}
