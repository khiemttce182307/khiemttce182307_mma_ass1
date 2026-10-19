import React, { createContext, useState, useContext } from 'react';
import { DEFAULT_PROFILE } from '../constants/defaultProfile';

// 1. Tao ProfileContext
const ProfileContext = createContext();

// 2. ProfileProvider quan ly state profile va cung cap ham cap nhat
export function ProfileProvider({ children }) {
  // Khoi tao state profile tu default an toan
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  // Ham cap nhat profile: KHONG mutate truc tiep ma dung spread operator tao object moi
  const updateProfile = (updatedFields) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      ...updatedFields,
    }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, defaultProfile: DEFAULT_PROFILE }}>
      {children}
    </ProfileContext.Provider>
  );
}

// 3. Custom hook de cac screen doc/ghi profile de dang
export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
