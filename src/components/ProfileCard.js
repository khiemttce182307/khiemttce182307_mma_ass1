import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ProfileCard({ name, bio, email, avatarUrl }) {
  const { colors } = useTheme();

  // Anh dai dien mac dinh neu avatarUrl rong
  const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80';
  const imageSource = avatarUrl && avatarUrl.trim() !== '' ? { uri: avatarUrl } : { uri: defaultAvatar };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Image
        source={imageSource}
        style={[styles.avatar, { borderColor: colors.primary }]}
      />
      <Text style={[styles.name, { color: colors.text }]}>{name || 'Unknown User'}</Text>
      {email ? <Text style={[styles.email, { color: colors.primary }]}>{email}</Text> : null}
      <Text style={[styles.bio, { color: colors.subText }]}>
        {bio || 'No bio provided yet.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    marginBottom: 16,
    backgroundColor: '#E9ECEF',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
});
