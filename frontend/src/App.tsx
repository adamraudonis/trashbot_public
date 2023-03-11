import React from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';
import {
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from '@react-oauth/google';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Controller from './components/Controller';

const apiURL = process.env.REACT_APP_API_URL;

function Home() {
  let auth = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Trashbot</h1>
      <AuthStatus />

      {!auth.user ? (
        <GoogleLogin
          useOneTap={true}
          auto_select={true}
          onSuccess={(credentialResponse: CredentialResponse) => {
            if (credentialResponse.credential != null) {
              const token: any = jwtDecode(credentialResponse.credential);
              const name: string = token.name;
              auth.signin(name);

              axios
                .get(apiURL + '/api/login', {
                  headers: { token: credentialResponse.credential },
                })
                .then((response) => {
                  console.log(response);
                })
                .catch((err) => console.log(err));

              // TODO: Call backend route
              // localStorage.setItem('token');
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      ) : (
        <div>
          <ul>
            <li>
              <Link to="/controller">Controller</Link>
            </li>
          </ul>
          <button
            onClick={() => {
              console.log('Clicked google logout');
              auth.signout();
              googleLogout();
              navigate(0);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

interface AuthContextType {
  user: any;
  signin: (user: string) => void;
  signout: () => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: string) => {
    setUser(newUser);
  };

  let signout = () => {
    setUser(null);
  };

  if (!user) {
    // TODO: Call backend route instead

    // See if the user's token is cached in local storage
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > decodedToken.exp || 0) {
      } else {
        user = decodedToken.name;
      }
    }
  }

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthStatus() {
  let auth = useAuth();
  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return <p>Welcome {auth.user}!</p>;
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/controller"
          element={
            <RequireAuth>
              <Controller />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
