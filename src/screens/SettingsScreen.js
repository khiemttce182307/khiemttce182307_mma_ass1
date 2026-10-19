import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

export default function SettingsScreen() {
  const { colors, themeMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.sectionTitle, { color: colors.subText }]}>PREFERENCES</Text>
      
      {/* Reusable ThemeToggle Component */}
      <ThemeToggle />

      <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>Appearance</Text>
        <Text style={[styles.infoDescription, { color: colors.subText }]}>
          Switching theme updates all 5 screens instantly via React Context API.
          Current mode: <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{themeMode.toUpperCase()}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 8,
    marginBottom: 4,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  infoDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
});
