import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './component/UI/Navbar/Navbar';
import AppRouter from './component/UI/AppRouter';
import AuthContext from './context';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, [isAuth]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading,
    }}
    >
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
