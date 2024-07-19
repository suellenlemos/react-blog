import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, NotFound, Register } from '../view/pages';

import { AuthGuard } from './AuthGuard';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
