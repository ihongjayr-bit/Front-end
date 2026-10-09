import { API_URL } from '@/constants/api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function VenuesScreen() {
  const [venues, setVenues] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/venues`)
      .then(res => setVenues(res.data.venues || res.data))
      .catch(err => console.error('Error fetching venues:', err.message));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Venues</Text>
      {venues.map(v => (
        <View key={v.id} style={styles.card}>
          <Text style={styles.title}>{v.name}</Text>
          <Text>{v.location}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  card: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 15, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 5 },
});