import React from 'react';
import '../styles/global.css';

/**
 *
 * @return {JSX.Element}
 */
function MyApp({ Component, pageProps }: any): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
