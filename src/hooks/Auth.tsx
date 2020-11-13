import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@GoBarber:user');
    const token = localStorage.getItem('@GoBarber:token');

    if (user && token) {
      return { user: JSON.parse(user), token };
    }
    return {} as AuthState;
  });

  /* ************************[DESCRIPTION SIGNIN]*******************************
  O método signIn passa os parâmetros 'email' e 'password' do usuário e recebe
  como retorno do backend o 'user' e o 'token';
  Essas informações são setadas no 'localStorage' para que estejam disponíveis
  sempre que a página for carregada novamente, nesse caso, se o usuário está
  logado ele continuará logado, pois o state inicial do 'data' puxará os dados;
  Também são setadas no próprio 'data', para o caso de o state inicial do ser
  vazio.
  Assim, o state do 'data':
    => Usuário não logado:
          State inicial vazio - {} as AuthState;
          Ao receber o 'email' e 'password' seta o 'localStorage' e o 'data';
    => Usuário logado: puxa os dados do localStorage como state inicial;
  *************************************************************************** */

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { user, token } = response.data;

    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    localStorage.setItem('@GoBarber:token', token);

    setData({ user, token });
  }, []);

  /* ***********************[DESCRIPTION SIGNOUT]*******************************
  O método signOut remove dos dados do localStorage e seta vazio no 'data';
  *************************************************************************** */

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:user');
    localStorage.removeItem('@GoBarber:token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
