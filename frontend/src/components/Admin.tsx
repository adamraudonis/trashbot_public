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
    await supabase.from('controller').update(controller).eq('id', 1).select();
    getProfile();
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
};

export default Account;
