import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';

// 1. Dinh nghia Yup Validation Schema
const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required and cannot be empty'),
  bio: Yup.string()
    .max(200, 'Bio cannot exceed 200 characters'),
  avatar: Yup.string()
    .trim()
    .url('Must be a valid URL (e.g., https://example.com/avatar.jpg)'),
});

export default function EditProfileScreen({ navigation }) {
  const { colors } = useTheme();
  const { profile, updateProfile } = useProfile();

  // Gia tri ban dau lay truc tiep tu ProfileContext
  const initialValues = {
    name: profile.name || '',
    bio: profile.bio || '',
    avatar: profile.avatar || '',
  };

  // Xu ly khi submit form thanh cong
  const handleSave = (values) => {
    // Trim cac khoang trang thua va cap nhat state an toan
    updateProfile({
      name: values.name.trim(),
      bio: values.bio.trim(),
      avatar: values.avatar.trim(),
    });
    // Quay lai ProfileScreen ngay sau khi luu
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.screenTitle, { color: colors.text }]}>Edit Profile Details</Text>
        <Text style={[styles.screenSubtitle, { color: colors.subText }]}>
          Update your public profile information below.
        </Text>

        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={handleSave}
          enableReinitialize={true} // Reset form moi khi vao lai man hinh
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              {/* FIELD 1: FULL NAME */}
              <View style={styles.fieldGroup}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Full Name <Text style={{ color: colors.danger }}>*</Text>
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.card,
                      color: colors.text,
                      borderColor: touched.name && errors.name ? colors.danger : colors.border,
                    },
                  ]}
                  placeholder="Enter your name"
                  placeholderTextColor={colors.subText}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                {touched.name && errors.name ? (
                  <Text style={[styles.errorText, { color: colors.danger }]}>{errors.name}</Text>
                ) : null}
              </View>

              {/* FIELD 2: BIO */}
              <View style={styles.fieldGroup}>
                <View style={styles.labelRow}>
                  <Text style={[styles.label, { color: colors.text }]}>Bio</Text>
                  <Text style={[styles.counter, { color: colors.subText }]}>
                    {values.bio ? values.bio.length : 0}/200
                  </Text>
                </View>
                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    {
                      backgroundColor: colors.card,
                      color: colors.text,
                      borderColor: touched.bio && errors.bio ? colors.danger : colors.border,
                    },
                  ]}
                  placeholder="Write a brief bio about yourself"
                  placeholderTextColor={colors.subText}
                  value={values.bio}
                  onChangeText={handleChange('bio')}
                  onBlur={handleBlur('bio')}
                  multiline={true}
                  numberOfLines={4}
                />
                {touched.bio && errors.bio ? (
                  <Text style={[styles.errorText, { color: colors.danger }]}>{errors.bio}</Text>
                ) : null}
              </View>

              {/* FIELD 3: AVATAR URL */}
              <View style={styles.fieldGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Avatar Image URL</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.card,
                      color: colors.text,
                      borderColor: touched.avatar && errors.avatar ? colors.danger : colors.border,
                    },
                  ]}
                  placeholder="https://example.com/avatar.jpg (optional)"
                  placeholderTextColor={colors.subText}
                  value={values.avatar}
                  onChangeText={handleChange('avatar')}
                  onBlur={handleBlur('avatar')}
                  autoCapitalize="none"
                  keyboardType="url"
                />
                {touched.avatar && errors.avatar ? (
                  <Text style={[styles.errorText, { color: colors.danger }]}>{errors.avatar}</Text>
                ) : (
                  <Text style={[styles.helpText, { color: colors.subText }]}>
                    Leave blank to use the default avatar image.
                  </Text>
                )}
              </View>

              {/* ACTION BUTTONS: CANCEL & SAVE */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton, { backgroundColor: colors.border }]}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={[styles.buttonText, { color: colors.text }]}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.saveButton, { backgroundColor: colors.primary }]}
                  onPress={handleSubmit}
                >
                  <Text style={[styles.buttonText, { color: colors.primaryText }]}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  form: {
    gap: 18,
  },
  fieldGroup: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  counter: {
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  helpText: {
    fontSize: 12,
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 16,
    paddingBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {},
  saveButton: {
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
