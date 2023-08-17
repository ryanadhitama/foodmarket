import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from '../showMessage';

export const storeData = async (storageKey: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    showMessage('Gagal menyimpan di localstorage', 'danger');
  }
};

export const getData = async (storageKey: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    showMessage('Gagal mengambil data dari localstorage', 'danger');
  }
};
