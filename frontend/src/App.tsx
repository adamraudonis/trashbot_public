import './index.scss';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Home from './components/Home';
import Account from './components/Account';
import Controls from './components/Controls';
import About from './components/About';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, session, ...rest }: any) => {
  // redirect to home page if user is not authenticated
  if (!session) {
    return <Navigate to="/" />;
  }
  return element;
};

export default function App() {
  const [session, setSession] = useState<any | null>(null);
  const [isDone, setIsDone] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('inside get session2');
      setSession(session);
      setIsDone(true);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('inside auth state change');

      setSession(session);
    });
  }, []);
  if (!isDone) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <Routes>
        <Route path="/" element={<Home session={session} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/controls"
          element={<PrivateRoute session={session} element={<Controls />} />}
        />
        <Route
          path="/account"
          element={
            <PrivateRoute
              session={session}
              element={<Account session={session} />}
            />
          }
        />
      </Routes>
    );
  }
}
