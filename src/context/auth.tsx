import { createContext, ReactNode, useState } from 'react';

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  email: string;
  setEmail: (newState: string) => void;
};

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
  email: '',
  setEmail: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth and email state
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );

  const [email, setEmail] = useState(initialValue.email);

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, email, setEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
