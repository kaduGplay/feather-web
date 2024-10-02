'use client';

import { createContext, useState, useEffect, useContext } from 'react';

import { apiClient } from '@src/services';

import { ICustomer } from '@src/interfaces';

import Cookies from 'js-cookie';

import { toast } from 'react-hot-toast';
import { addMinutes } from 'date-fns';

type SignInData = {
  email: string;
  password: string;
  remember_me: boolean;
  setLoading: (loading: boolean) => void;
};

type AuthContextType = {
  isAuthenticated: boolean;
  customer: ICustomer | null;
  setCustomer: (customer: ICustomer | null) => void;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<ICustomer | null>(null);

  const isAuthenticated = !!customer;

  const recoverCustomer = async () => {
    await apiClient
      .get('/customer')
      .then(response => {
        setCustomer(response.data);
      })
      .catch(() => {
        setCustomer(null);
      });
  };

  useEffect(() => {
    const token = Cookies.get('session');

    if (token) recoverCustomer();
  }, []);

  async function signIn({ email, password, remember_me, setLoading }: SignInData) {
    await apiClient
      .post('/auth', {
        email,
        password,
        remember_me,
      })
      .then(response => {
        Cookies.set('session', response.data.token, {
          expires: addMinutes(new Date(), remember_me ? 360 : 180),
        });

        apiClient.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.token}`;

        setCustomer(response.data.user);

        toast.success('Logado com sucesso.');

        if (customer?.role !== 'CUSTOMER') {
          return (window.location.href = '/admin');
        }

        window.location.href = '/dashboard';
      })
      .catch(error => {
        toast.error(error.response.data.message);

        setLoading(false);
      });
  }

  function signOut() {
    Cookies.remove('session');

    setCustomer(null);

    window.location.href = '/';
  }

  return (
    <AuthContext.Provider
      value={{ customer, setCustomer, isAuthenticated, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useCustomer = () => useContext(AuthContext);

export { AuthProvider, useCustomer };
