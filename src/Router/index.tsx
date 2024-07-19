import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Layout = () => {
  return <div>Layout</div>;
};

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<h1>Register</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
        </Route>

        <Route path="/" element={<h1>Home</h1>} />
        <Route path="*" element={<h1>Página Não Encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
