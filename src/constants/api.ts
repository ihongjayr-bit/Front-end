import Constants from 'expo-constants';
import { Platform } from 'react-native';

const PORT = 8000;

// Fallback: your PC's IPv4 address (run `ipconfig`, copy the Wi-Fi "IPv4 Address")
const LAN_IP = '192.168.56.1';

// Expo tells the app your PC's address (e.g. "192.168.1.40:8081"), so it
// follows you if your IP changes. Only a plain IP is used, otherwise
// (e.g. tunnel mode) it falls back to LAN_IP.
const expoHost = Constants.expoConfig?.hostUri?.split(':')[0];
const host = expoHost && /^\d+\.\d+\.\d+\.\d+$/.test(expoHost) ? expoHost : LAN_IP;

export const API_URL = Platform.select({
  web: `http://localhost:${PORT}/api`,
  android: `http://${host}:${PORT}/api`,
  ios: `http://${host}:${PORT}/api`,
  default: `http://${host}:${PORT}/api`,
}) as string;