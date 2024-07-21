import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, NotFound, Register } from '../view/pages';

import { AuthGuard } from './AuthGuard';
import { AuthLayout, MainLayout } from '../view/layouts';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
