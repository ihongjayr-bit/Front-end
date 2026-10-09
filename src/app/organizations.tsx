import { API_URL } from '@/constants/api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function OrganizationsScreen() {
  const [organizations, setOrganizations] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/organizations`)
      .then(response => {
        const orgData = response.data.organizations || response.data;
        setOrganizations(orgData);
      })
      .catch(error => console.error('Error fetching organizations:', error));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Organizations</Text>
      {organizations.map(org => (
        <View key={org.id} style={styles.card}>
          <Text style={styles.title}>{org.name}</Text>
          <Text>{org.description}</Text>
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