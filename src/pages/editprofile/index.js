
import React, { useState } from 'react';
import '../../assets/style/EditProfile.css';

import iconUser from '../../assets/img/editprofile/UserIcon.svg';
import iconEmail from '../../assets/img/editprofile/EmailIcon.svg';
import iconPassword from '../../assets/img/editprofile/PasswordIcon.svg';
import imgEdit from '../../assets/img/editprofile/InputEditIcon.svg';

const EditProfile = ({ onBack, profileData, setProfileData }) => {
  const [formData, setFormData] = useState({
    fullName: profileData.fullName,
    email: profileData.email,
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    const { fullName, email } = formData;
    setProfileData({ ...profileData, fullName, email });
    onBack();
  };

  const inputFields = [
    { icon: iconUser, type: 'text', name: 'fullName', placeholder: 'Full Name' },
    { icon: iconEmail, type: 'email', name: 'email', placeholder: 'Email' },
    { icon: iconPassword, type: 'password', name: 'password', placeholder: 'Password' },
  ];

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-content">
        {inputFields.map((field, index) => (
          <div className="input-group" key={index}>
            <img className="input-icon" src={field.icon} alt={field.placeholder}/>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleInputChange}
            />
            <img className="edit-icon" src={imgEdit} alt="Editar"/>
          </div>
        ))}
        <button className="save-button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
