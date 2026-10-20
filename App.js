import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { ProfileProvider, useProfile } from './src/context/ProfileContext';
import AppNavigator from './src/navigation/AppNavigator';

function MainApp() {
  const { colors, isLoadingTheme } = useTheme();
  const { isLoadingProfile } = useProfile();

  // HYDRATION LOADING GATE:
  // Giu man hinh loading cho den khi AsyncStorage load xong Theme & Profile.
  // Giai phap nay ngan chan triet de loi nhay sai theme (Theme Flash) luc khoi dong app.
  if (isLoadingTheme || isLoadingProfile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading your preferences...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style={colors.statusBarStyle} />
      <AppNavigator />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ProfileProvider>
          <MainApp />
        </ProfileProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 14,
    color: '#6C757D',
    fontSize: 15,
    fontWeight: '500',
  },
});
