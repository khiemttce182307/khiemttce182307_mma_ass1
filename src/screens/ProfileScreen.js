import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ROUTES } from '../constants/routes';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import ProfileCard from '../components/ProfileCard';

export default function ProfileScreen({ navigation }) {
  const { colors } = useTheme();
  // Doc du lieu profile truc tiep tu ProfileContext
  const { profile } = useProfile();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Reusable ProfileCard hien thi thong tin profile hien tai */}
      <ProfileCard
        name={profile.name}
        bio={profile.bio}
        avatarUrl={profile.avatar}
      />

      <TouchableOpacity
        style={[styles.editButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE)}
      >
        <Text style={[styles.editButtonText, { color: colors.primaryText }]}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    gap: 24,
  },
  editButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
