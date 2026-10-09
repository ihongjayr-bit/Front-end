import { Platform } from 'react-native';

const LAN_IP = '192.168.1.40';
export const API_URL = Platform.select({
  android: 'http://10.0.2.2:8000/api', // Android emulator
  ios: 'http://localhost:8000/api',    // iOS simulator
  web: 'http://localhost:8000/api',
  default: `http://${LAN_IP}:8000/api`,
});