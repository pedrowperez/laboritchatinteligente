import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/header';
import ChatBot from './pages/chat/index';
import Onboarding from './pages/onboarding/index';
import Introduction from './pages/introduction/index';
import Profile from './pages/profile/index';
import Preferences from './pages/preferences/index';
import EditProfile from './pages/editprofile/index';
import InviteFriends from './pages/invite/index';
import NavigationContext, { NavigationProvider } from './server/navigationprovider';

const App = () => {
  const { currentPath, navigate, goBack, profileData, setProfileData } = useContext(NavigationContext);

  const handleIntroductionComplete = () => {
    const onboardingSeen = localStorage.getItem('onboardingSeen');
    if (onboardingSeen) {
      navigate('/chatbot');
    } else {
      navigate('/onboarding');
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingSeen', 'true');
    navigate('/chatbot');
  };

  const handleMenuClick = () => {
    navigate('/profile');
  };

  const getHeaderTitle = () => {
    switch (currentPath) {
      case '/chatbot':
        return 'Health';
      case '/profile':
        return 'Profile';
      case '/preferences':
        return 'Preference';
      case '/editprofile':
        return 'Edit Information';
      case '/invitefriends':
        return 'Invite Friends';
      default:
        return '';
    }
  };

  return (
    <>
      {currentPath !== '/introduction' && currentPath !== '/onboarding' && (
        <Header 
          onBack={goBack} 
          title={getHeaderTitle()}  
          onMenuClick={currentPath === '/chatbot' ? handleMenuClick : null}
          isMenuDisabled={currentPath !== '/chatbot'}
        />
      )}
      <Routes>
        <Route path="/introduction" element={<Introduction onComplete={handleIntroductionComplete} />} />
        <Route path="/onboarding" element={<Onboarding onComplete={handleOnboardingComplete} />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/profile" element={<Profile profileData={profileData} onPreferencesClick={() => navigate('/preferences')} />} />
        <Route path="/preferences" element={
          <Preferences
            onBack={goBack}
            onAccountInformationClick={() => navigate('/editprofile')}
            onInviteFriendsClick={() => navigate('/invitefriends')}
          />
        } />
        <Route path="/editprofile" element={<EditProfile onBack={goBack} profileData={profileData} setProfileData={setProfileData} />} />
        <Route path="/invitefriends" element={<InviteFriends onBack={goBack} />} />
        <Route path="*" element={<Navigate to={currentPath || '/introduction'} />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <NavigationProvider>
      <App />
    </NavigationProvider>
  </Router>
);

export default AppWrapper;
