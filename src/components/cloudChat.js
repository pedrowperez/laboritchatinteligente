import React from 'react';

import imgUser from '../assets/img/chat/Image.png';
import imgEdit from '../assets/img/chat/EditIcon.svg';
import imgCopy from '../assets/img/chat/IconCopy.svg';
import imgShare from '../assets/img/chat/IconShare.svg';
import imgBot from '../assets/img/chat/Brainbox.png';

const CloudChat = ({ message, index, onEdit, className }) => {
  const handleEdit = () => {
    onEdit(index);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text).then(() => {
      alert('Mensagem copiada para a área de transferência!');
    }).catch(err => {
      console.error('Erro ao copiar a mensagem: ', err);
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mensagem do BrainBox',
        text: message.text,
        url: window.location.href,
      }).then(() => {
        alert('Mensagem compartilhada com sucesso!');
      }).catch(err => {
        console.error('Erro ao compartilhar a mensagem: ', err);
      });
    } else {
      alert('Compartilhamento não suportado no seu navegador.');
    }
  };

  return (
    <div key={index} className={`message ${message.user ? 'user-message' : 'bot-message'} ${className}`}>
      <div className='message-cloud-full'>
        <div className='message-cloud'>
          {message.user ? <img src={imgUser} alt="Avatar do usuário" /> : <img src={imgBot} alt="Avatar do BrainBox" />}
          {message.user && <p>{message.text}</p>}
          <div className='message-menu'>
            {message.user && <button className='edit-message' onClick={handleEdit}> <img src={imgEdit} alt="Editar mensagem" /></button>}
            {!message.user && <button className='copy-message' onClick={handleCopy}> <img src={imgCopy} alt="Copiar mensagem" /></button>}
            {!message.user && <button className='share-message' onClick={handleShare}> <img src={imgShare} alt="Compartilhar mensagem" /></button>}
          </div>
        </div>
        {!message.user && <p>{message.text}</p>}
      </div>
    </div>
  );
};

export default CloudChat;