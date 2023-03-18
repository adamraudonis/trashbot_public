import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import React from 'react';

const Account = ({ session }: any) => {
  const [loading, setLoading] = useState<any | null>(true);
  const [users, setUsers] = useState<any | null>([]);
  const [controllingUser, setControllingUser] = useState<any | null>([]);

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    setLoading(true);

    const profiles = await supabase.from('profiles').select();
    setUsers(profiles.data);

    const raw_cuid: any = await supabase.from('controller').select('user_id');
    const cuid = raw_cuid.data[0]['user_id'];

    const profiles_data = profiles.data || [];
    const controllerUser = profiles_data.filter(
      (item) => item.user_id === cuid
    );
    setControllingUser(controllerUser[0]);

    setLoading(false);
  };

  const buttonPress = async (user_id: string) => {
    const controller = {
      id: 1,
      created_at: new Date(),
      user_id: user_id,
    };
    const resp = await supabase
      .from('controller')
      .update(controller)
      .eq('id', 1)
      .select();
    console.log(resp);
  };

  if (loading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div>
        <a href="/">Back</a>
        <h1>Admin</h1>
        <p style={{ color: 'white' }}>
          Controlling User: {controllingUser.name} {controllingUser.email}
        </p>
        {users.map((user: any) => {
          return (
            <div>
              <button onClick={() => buttonPress(user.user_id)}>
                {user.name}
                {'\n'}
                {user.email}
              </button>
              <br />
            </div>
          );
        })}
      </div>
    );
  }

  //   const [loading, setLoading] = useState<any | null>(true);
  //   const [username, setUsername] = useState<any | null>(null);
  //   const [website, setWebsite] = useState<any | null>(null);
  //   const [avatar_url, setAvatarUrl] = useState<any | null>(null);

  //   const updateProfile = async (e: any) => {
  //     e.preventDefault();

  //     try {
  //       setLoading(true);
  //       const { user } = session;

  //       const updates = {
  //         id: user.id,
  //         username,
  //         website,
  //         avatar_url,
  //         updated_at: new Date(),
  //       };

  //       let { error } = await supabase.from('profiles').upsert(updates);

  //       if (error) {
  //         throw error;
  //       }
  //     } catch (error: any) {
  //       console.log(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   return (
  //     <div aria-live="polite">
  //       {loading ? (
  //         'Saving ...'
  //       ) : (
  //         <form onSubmit={updateProfile} className="form-widget">
  //           <div>Email: {session.user.email}</div>
  //           <div>
  //             <label htmlFor="username">Name</label>
  //             <input
  //               id="username"
  //               type="text"
  //               value={username || ''}
  //               onChange={(e) => setUsername(e.target.value)}
  //             />
  //           </div>
  //           <div>
  //             <label htmlFor="website">Website</label>
  //             <input
  //               id="website"
  //               type="url"
  //               value={website || ''}
  //               onChange={(e) => setWebsite(e.target.value)}
  //             />
  //           </div>
  //           <div>
  //             <button className="button primary block" disabled={loading}>
  //               Update profile
  //             </button>
  //           </div>
  //         </form>
  //       )}
  //       <button
  //         type="button"
  //         className="button block"
  //         onClick={() => supabase.auth.signOut()}
  //       >
  //         Sign Out
  //       </button>
  //     </div>
  //   );
};

export default Account;
