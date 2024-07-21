import { Toaster } from 'react-hot-toast';

import { Router } from './Router';
import { AuthProvider } from './app/contexts';
import { TooltipProvider } from '@radix-ui/react-tooltip';

export const App = () => {
  return (
    <>
      <TooltipProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </>
  );
};
