import React from 'react';
import '../../assets/style/Invite.css';

import imgRedeem from '../../assets/img/Illustration.svg';
import imgCopy from '../../assets/img/copyIconBlack.svg';

const InviteFriends = ({ onBack }) => {
  const inviteCode = 'BrainAiPartnerMR';

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    alert('Invite code copied to clipboard');
  };

  return (
    <div className="invite-friends-container">
      <div className="invite-friends-content">
        <div className="invite-box">
          <img src={imgRedeem} alt="Invite" className="invite-image" />
          <h2>Refer A Friend</h2>
          <p>Share Your Promo Code & Get $3 For Each Friend</p>
          <div className="invite-code-container">
            <input type="text" value={inviteCode} readOnly />
            <button className="copy-button" onClick={handleCopy}>
              <img src={imgCopy} alt="Copiar código"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriends;
