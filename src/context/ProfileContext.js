import React, { createContext, useState, useEffect, useContext } from 'react';
import { DEFAULT_PROFILE } from '../constants/defaultProfile';
import { getItem, setItem } from '../storage/storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // Hydrate: Doc du lieu profile tu AsyncStorage khi khoi dong app
  useEffect(() => {
    async function hydrateProfile() {
      try {
        const savedProfile = await getItem(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
        // Fallback an toan: Dam bao profile co day du cac truong co ban
        if (savedProfile && typeof savedProfile === 'object') {
          setProfile({
            ...DEFAULT_PROFILE,
            ...savedProfile,
          });
        }
      } catch (error) {
        console.warn('[ProfileContext] Error during hydration:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    }

    hydrateProfile();
  }, []);

  // Cap nhat profile khong mutate va luu vao AsyncStorage
  const updateProfile = async (updatedFields) => {
    const nextProfile = {
      ...profile,
      ...updatedFields,
    };
    // 1. Cap nhat state de UI re-render tuc thi
    setProfile(nextProfile);
    // 2. Persist xuong storage bat dong bo co await
    await setItem(STORAGE_KEYS.PROFILE, nextProfile);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        defaultProfile: DEFAULT_PROFILE,
        isLoadingProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
