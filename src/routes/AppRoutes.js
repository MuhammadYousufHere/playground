import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import { privateRoutes, publicRoutes } from '../routes';

const AppRouter = ({ publicRoutes, privateRoutes }) => {
  const auth = false;
  return auth ? (
    <Routes>
      {privateRoutes.map(({ path, element }) => (
        <Route
          path={path}
          element={element}
          key={path}
        />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route
          path={path}
          element={element}
          key={path}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
