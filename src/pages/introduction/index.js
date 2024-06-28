import React, { useEffect } from 'react';
import '../../assets/style/Introduction.css';
import logo from '../../assets/img/Logo.svg'; // Substitua pelo caminho real da sua imagem

const Introduction = ({ onComplete }) => {
    useEffect(() => {
      const timer = setTimeout(onComplete, 4000); // Chama onComplete após 4 segundos
      return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    }, [onComplete]);
    
  return (
    <div className="introduction-container">
      <img src={logo} alt="Logo" className="logo" />
      <div className='info-app'>
        <h1>BrainBox</h1>
        <p>Version 1.0</p>
      </div>
    </div>
  );
};

export default Introduction;
