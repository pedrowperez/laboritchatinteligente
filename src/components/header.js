import React from 'react';
import imgArrow from '../assets/img/header/Arrow.svg';
import imgMenu from '../assets/img/header/Icon.svg';

const Header = ({ onBack, onMenuClick, title, isMenuDisabled }) => {
  return (
    <header className="header">
      <div className='header-box'>
        <button className="back-button" onClick={onBack}>
          <img src={imgArrow} alt="Voltar" />
        </button>
        <h1>{title}</h1>
        <button
          className={`menu-button ${isMenuDisabled ? 'disabled' : ''}`}
           onClick={isMenuDisabled ? null : onMenuClick}
          disabled={isMenuDisabled}
        > <img src={imgMenu} alt="Menu" /> 
        </button>
      
      </div>
    </header>
  );
};

export default Header;
