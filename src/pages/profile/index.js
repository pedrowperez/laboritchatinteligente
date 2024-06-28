import React from 'react';
import profileImg from '../../assets/img/RobotImage.png';
import '../../assets/style/Profile.css';

import imgArrowMenu from '../../assets/img/profile/Arrow-menu.png';
import iconPreferences from '../../assets/img/profile/SettingsIcon.svg';
import iconSecurity from '../../assets/img/profile/LockIcon.svg';
import iconCustomer from '../../assets/img/profile/HelpIcon.svg';
import iconLogout from '../../assets/img/profile/LogoutIcon.svg';

import iconHome from '../../assets/img/profile/HomeIcon.svg';
import iconTools from '../../assets/img/profile/ToolsIcon.svg';
import iconTime from '../../assets/img/profile/TimeIcon.svg';
import iconProfileBottom from '../../assets/img/profile/ProfileIconBottom.svg';

const menuItems = [
  {
    icon: iconPreferences,
    text: 'Preferences',
    onClick: 'onPreferencesClick',
  },
  {
    icon: iconSecurity,
    text: 'Account Security',
  },
  {
    icon: iconCustomer,
    text: 'Customer Support',
  },
  {
    icon: iconLogout,
    text: 'Logout',
  },
];

const Profile = ({ profileData, onPreferencesClick }) => {
  const handleClick = (onClick) => {
    if (onClick) {
      const callback = {
        onPreferencesClick,
      }[onClick];
      if (callback) callback();
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className='profile-info'>
          <div className="profile-image">
            <img src={profileImg} alt="Profile" />
          </div>
          <h2>{profileData.fullName}</h2>
          <p>{profileData.email}</p>
        </div>
        <div className="profile-menu">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <div
                className="menu-item"
                onClick={() => handleClick(item.onClick)}
              >
                <span className="menu-icon">
                  <img src={item.icon} alt={`Ir para ${item.text}`} />
                </span>
                <span className="menu-text">{item.text}</span>
                {item.text !== 'Logout' && (
                  <img src={imgArrowMenu} alt={`Ir para ${item.text}`} />
                )}
              </div>
              {item.text === 'Account Security' && (
                <div className="security-status" key={`security-${index}`}>
                  <div className="security-bar">
                    <div className="security-level" style={{ width: '80%' }}></div>
                  </div>
                  <span className='security-label'>Excellent</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <footer className="profile-footer">
        <span className="footer-icon"><img src={iconHome} alt="Home" /></span>
        <span className="footer-icon"><img src={iconTools} alt="Tools" /></span>
        <span className="footer-icon"><img src={iconTime} alt="Time" /></span>
        <span className="footer-icon active"><img src={iconProfileBottom} alt="Profile" /></span>
      </footer>
    </div>
  );
};

export default Profile;
