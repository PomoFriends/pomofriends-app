import { useEffect } from 'react';
import Router from 'next/router';

export const useBeforeUnload = (when: boolean, message: string) => {
  useEffect(() => {
    const routeChangeStart = (url: any) => {
      if (Router.asPath !== url && when && !confirm(message)) {
        try {
          Router.events.emit('routeChangeError');
          Router.replace(Router, Router.asPath);
        } catch {
          console.log('Abort route change. Please ignore this error.');
        }
      }
    };

    // window.addEventListener('beforeunload', beforeunload);
    window.onbeforeunload = () => {
      if (when) {
        return 'yo';
      }
    };
    Router.events.on('routeChangeStart', routeChangeStart);

    return () => {
      //   window.removeEventListener('beforeunload', beforeunload);
      window.onbeforeunload = null;
      Router.events.off('routeChangeStart', routeChangeStart);
    };
  }, [when, message]);
};
