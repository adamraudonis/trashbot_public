import { useState } from 'react';
import { supabase } from '../supabaseClient';
import React from 'react';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

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

  return (
    <div>
      <div>
        <h1 className="header">Supabase + React</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        {loading ? (
          'Logging In...'
        ) : (
          <button onClick={handleLogin}>Login With Google</button>
        )}
      </div>
    </div>
  );
}
