import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    fullName: 'Tom Hillson',
    email: 'Tomhill@gmail.com',
  });
  const [history, setHistory] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialized) {
      setHistory(['/introduction']);
      navigate('/introduction');
      setInitialized(true);
    }
  }, [initialized, navigate]);

  const handleNavigate = (path) => {
    setHistory((prevHistory) => [...prevHistory, path]);
    navigate(path);
  };

  const handleGoBack = () => {
    setHistory((prevHistory) => prevHistory.slice(0, -1));
    navigate(history[history.length - 2] || '/');
  };

  const currentPath = history[history.length - 1];

  return (
    <NavigationContext.Provider
      value={{ profileData, setProfileData, navigate: handleNavigate, goBack: handleGoBack, currentPath }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;
