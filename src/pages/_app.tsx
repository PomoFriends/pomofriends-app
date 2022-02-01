import { AppProps } from 'next/app';
import { AuthProvider } from '../hooks/useAuth';
import React from 'react';
import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps): any => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
