import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ROUTES } from '../constants/routes';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';

export default function HomeScreen({ navigation }) {
  const { colors, themeMode } = useTheme();
  const { profile } = useProfile();

  const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80';
  const avatarUri = profile.avatar && profile.avatar.trim() !== '' ? profile.avatar : defaultAvatar;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Banner thong tin nguoi dung tu ProfileContext */}
      <View style={[styles.welcomeCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Image source={{ uri: avatarUri }} style={[styles.avatar, { borderColor: colors.primary }]} />
        <View style={styles.welcomeText}>
          <Text style={[styles.greeting, { color: colors.subText }]}>Welcome back,</Text>
          <Text style={[styles.userName, { color: colors.text }]}>{profile.name}</Text>
        </View>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>Assignment 01</Text>
      <Text style={[styles.subtitle, { color: colors.subText }]}>
        Profile & Activity App ({themeMode.toUpperCase()} MODE)
      </Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate(ROUTES.PROFILE)}
        >
          <Text style={[styles.buttonText, { color: colors.primaryText }]}>Go to Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate(ROUTES.ACTIVITY)}
        >
          <Text style={[styles.buttonText, { color: colors.primaryText }]}>Go to Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate(ROUTES.SETTINGS)}
        >
          <Text style={[styles.buttonText, { color: colors.primaryText }]}>Go to Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  welcomeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    width: '100%',
    maxWidth: 320,
    marginBottom: 28,
    gap: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    backgroundColor: '#E9ECEF',
  },
  welcomeText: {
    flex: 1,
  },
  greeting: {
    fontSize: 12,
  },
  userName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 28,
    letterSpacing: 0.5,
  },
  menuContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 14,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
