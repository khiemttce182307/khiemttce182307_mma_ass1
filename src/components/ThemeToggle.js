import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { themeMode, toggleTheme, colors } = useTheme();
  const isDark = themeMode === 'dark';

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Dark Mode</Text>
        <Text style={[styles.subtitle, { color: colors.subText }]}>
          {isDark ? 'Dark theme is active' : 'Light theme is active'}
        </Text>
      </View>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        thumbColor={isDark ? colors.primary : '#FFFFFF'}
        trackColor={{ false: '#D1D5DB', true: colors.primary }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    width: '100%',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
  },
});
