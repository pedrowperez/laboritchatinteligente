import React from 'react';
import '../../assets/style/Preferences.css';

import iconAccount from '../../assets/img/preferences/AccountIcon.svg';
import iconPassword from '../../assets/img/preferences/PasswordIcon.svg';
import iconPayment from '../../assets/img/preferences/PaymentIcon.svg';
import iconInvite from '../../assets/img/preferences/InviteIcon.svg';
import iconThemeColor from '../../assets/img/profile/SettingsIcon.svg';

const menuItems = [
  {
    icon: iconAccount,
    title: 'Account Information',
    description: 'Change your Account Information',
    onClick: 'onAccountInformationClick',
  },
  {
    icon: iconPassword,
    title: 'Password',
    description: 'Change your Password',
  },
  {
    icon: iconPayment,
    title: 'Payment Methods',
    description: 'Add Your Credit / Debit Cards',
  },
  {
    icon: iconInvite,
    title: 'Invite Your Friends',
    description: 'Get $3 For Each Invitation!',
    onClick: 'onInviteFriendsClick',
  },
  {
    icon: iconThemeColor,
    title: 'Theme Colour',
    description: 'Change Your Theme Colour',
  },
];

const Preferences = ({ onBack, onAccountInformationClick, onInviteFriendsClick }) => {
  const handleClick = (onClick) => {
    if (onClick) {
      const callback = {
        onAccountInformationClick,
        onInviteFriendsClick,
      }[onClick];
      if (callback) callback();
    }
  };

  return (
    <div className="preferences-container">
      <div className="preferences-content">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-item"
            onClick={() => handleClick(item.onClick)}
          >
            <img className="menu-icon" src={item.icon} alt={item.title}/>
            <div className="menu-text">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preferences;
