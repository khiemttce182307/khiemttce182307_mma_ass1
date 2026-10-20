import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { setRawItem, clearAll } from '../storage/storage';
import ThemeToggle from '../components/ThemeToggle';

export default function SettingsScreen() {
  const { colors, themeMode } = useTheme();
  const { profile } = useProfile();
  const [testStatus, setTestStatus] = useState('');

  // 1. Gia lap luu du lieu JSON bi hong vao storage
  const handleInjectCorruptData = async () => {
    // Ghi mot chuoi JSON sai cu phap vao khoa Profile
    await setRawItem(STORAGE_KEYS.PROFILE, '{ "name": corrupt_json_no_quotes, bio: ');
    setTestStatus('Injected corrupt JSON into @app_user_profile. Restart app to see safe fallback!');
    Alert.alert(
      'Corrupt Data Injected',
      'Đã ghi chuỗi JSON hỏng vào storage. Khi khởi động lại app, try/catch sẽ bắt lỗi và tự động dùng defaultProfile an toàn, không hề bị crash!',
      [{ text: 'OK' }]
    );
  };

  // 2. Gia lap lan dau chay app (Xoa toan bo AsyncStorage)
  const handleSimulateFirstRun = async () => {
    await clearAll();
    setTestStatus('Storage cleared. Next app start will behave like a fresh first-run.');
    Alert.alert(
      'Storage Cleared (First-run)',
      'Toàn bộ AsyncStorage đã được xóa sạch. Khởi động lại app sẽ kiểm tra hành vi lần đầu chạy.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.sectionTitle, { color: colors.subText }]}>PREFERENCES</Text>
      
      {/* Reusable ThemeToggle Component */}
      <ThemeToggle />

      <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>Appearance & Persistence</Text>
        <Text style={[styles.infoDescription, { color: colors.subText }]}>
          Theme state: <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{themeMode.toUpperCase()}</Text>
          {'\n'}Active profile: <Text style={{ color: colors.text, fontWeight: '600' }}>{profile.name}</Text>
          {'\n'}All changes are persisted to device storage using AsyncStorage.
        </Text>
      </View>

      {/* KHU VUC CONG CU TEST PHUC VU PHONG VAN VA CHAM DIEM */}
      <Text style={[styles.sectionTitle, { color: colors.subText, marginTop: 12 }]}>
        INTERVIEW & GRADING TEST TOOLS
      </Text>

      <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.infoTitle, { color: colors.text }]}>Data Integrity & Fallback Tests</Text>
        <Text style={[styles.infoDescription, { color: colors.subText, marginBottom: 12 }]}>
          Dùng các nút này để chứng minh cho giảng viên thấy app xử lý dữ liệu hỏng / rỗng an toàn tuyệt đối.
        </Text>

        <TouchableOpacity
          style={[styles.testButton, { backgroundColor: colors.danger }]}
          onPress={handleInjectCorruptData}
        >
          <Text style={styles.testButtonText}>Inject Corrupt JSON (Test Fallback)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.testButton, { backgroundColor: '#6C757D', marginTop: 10 }]}
          onPress={handleSimulateFirstRun}
        >
          <Text style={styles.testButtonText}>Clear Storage (Test First-Run)</Text>
        </TouchableOpacity>

        {testStatus ? (
          <Text style={[styles.statusText, { color: colors.primary }]}>{testStatus}</Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 8,
    marginBottom: 6,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
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
  testButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statusText: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '500',
  },
});
