import './index.scss';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Home from './components/Home';
import Admin from './components/Admin';
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
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);

      if (session) {
        const { data }: any = await supabase
          .from('admins')
          .select()
          .eq('id', session.user.id);
        setIsAdmin(data.length > 0);
      } else {
        setIsAdmin(false);
      }

      setIsDone(true);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('inside auth state change', _event, session);

      setSession(session);
    });
  }, []);
  if (!isDone) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <Routes>
        <Route
          path="/"
          element={<Home session={session} isAdmin={isAdmin} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/controls"
          element={
            <PrivateRoute
              session={session}
              element={<Controls session={session} />}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute
              session={session}
              element={<Admin session={session} />}
            />
          }
        />
      </Routes>
    );
  }
}
