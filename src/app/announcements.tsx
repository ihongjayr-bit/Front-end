import { API_URL } from '@/constants/api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AnnouncementsScreen() {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/announcements`)
      .then(response => {
        const announcementData = response.data.announcements || response.data;
        setAnnouncements(announcementData);
      })
      .catch(error => console.error('Error fetching announcements:', error));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Announcements</Text>
      {announcements.map(announcement => (
        <View key={announcement.id} style={styles.card}>
          <Text style={styles.title}>{announcement.title}</Text>
          <Text>{announcement.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  card: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 15, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 5 }
});