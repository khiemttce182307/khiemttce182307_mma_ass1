import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Doc du lieu tu AsyncStorage voi fallback an toan
 * @param {string} key - Khoa can doc
 * @param {*} fallback - Gia tri tra ve mac dinh neu loi hoac chua co du lieu
 * @returns {Promise<*>} - Du lieu da parse hoac fallback
 */
export async function getItem(key, fallback = null) {
  try {
    const rawValue = await AsyncStorage.getItem(key);
    // Truong hop 1: Key chua ton tai (lan dau chay app) -> tra ve fallback
    if (rawValue === null || rawValue === undefined) {
      return fallback;
    }
    // Truong hop 2: Parse JSON thanh object/gia tri hop le
    return JSON.parse(rawValue);
  } catch (error) {
    // Truong hop 3: Du lieu bi hong JSON hoac loi native storage -> khong crash app ma tra fallback
    console.warn(`[Storage] Failed to get or parse key "${key}". Using fallback.`, error);
    return fallback;
  }
}

/**
 * Ghi du lieu vao AsyncStorage voi JSON.stringify
 * @param {string} key - Khoa can ghi
 * @param {*} value - Du lieu can luu (object, string, array, boolean)
 * @returns {Promise<boolean>} - Tra ve true neu thanh cong, false neu loi
 */
export async function setItem(key, value) {
  try {
    const jsonString = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonString);
    return true;
  } catch (error) {
    console.warn(`[Storage] Failed to set key "${key}".`, error);
    return false;
  }
}

/**
 * Xoa mot key cu the khoi AsyncStorage
 */
export async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`[Storage] Failed to remove key "${key}".`, error);
    return false;
  }
}

/**
 * Xoa toan bo du lieu AsyncStorage (phuc vu test First-run)
 */
export async function clearAll() {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.warn('[Storage] Failed to clear all storage.', error);
    return false;
  }
}

/**
 * Ghi truc tiep chuoi RAW vao storage (dung de chu dong tao Corrupt JSON de test)
 */
export async function setRawItem(key, rawString) {
  try {
    await AsyncStorage.setItem(key, rawString);
    return true;
  } catch (error) {
    console.warn(`[Storage] Failed to set raw key "${key}".`, error);
    return false;
  }
}
