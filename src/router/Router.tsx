import { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Home} from '../pages/home'
import { Perfil } from '../pages/perfil';

export const RouterAsRouter = () :ReactNode => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil/:id" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
};