import { Toaster } from 'react-hot-toast';

import { Router } from './Router';
import { AuthProvider } from './app/contexts';

export const App = () => {
  return (
    <>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </>
  );
};
