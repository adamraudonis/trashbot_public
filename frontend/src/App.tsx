// import { useState, useEffect } from "react";
// import { supabase } from "./lib/api";
// import Auth from "./components/Auth";
// import Home from "./components/Home";
// import type { User } from "@supabase/supabase-js";
// import React from "react";

// function App() {
//     const [user, setUser] = useState<User | null>(null);

//     useEffect(() => {
//         const session = supabase.auth.session();
//         setUser(session?.user ?? null);

//         const { data: authListener } = supabase.auth.onAuthStateChange(
//             async (event, session) => {
//                 const currentUser = session?.user;
//                 setUser(currentUser ?? null);
//             }
//         );

//         return () => {
//             authListener?.unsubscribe();
//         };
//     }, [user]);

//     return (
//         <div className="min-w-full min-h-screen flex items-center justify-center bg-gray-200">
//             {!user ? <Auth /> : <Home user={user} />}
//         </div>
//     );
// }

// export default App;

import './index.css';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import Account from './components/Account';
import React from 'react';

export default function App() {
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
