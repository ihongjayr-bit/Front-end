import { API_URL } from '@/constants/api';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function EventsScreen() {
  const params = useLocalSearchParams();
  const selectedId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [events, setEvents] = useState<any[]>([]);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // load the list
  useEffect(() => {
    axios.get(`${API_URL}/events`)
      .then(res => setEvents(res.data.events || res.data))
      .catch(e => console.error('Error fetching events:', e.message))
      .finally(() => setLoading(false));
  }, []);

  // load one event when one is selected
  useEffect(() => {
    if (!selectedId) { setEvent(null); return; }
    axios.get(`${API_URL}/events/${selectedId}`)
      .then(res => setEvent(res.data.event || res.data))
      .catch(e => console.error('Error fetching event:', e.message));
  }, [selectedId]);

  // ---- detail view ----
  if (selectedId) {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => router.setParams({ id: undefined })}>
          <Text style={styles.back}>← Back to events</Text>
        </TouchableOpacity>
        {event ? (
          <>
            <Text style={styles.title}>{event.name}</Text>
            <Text style={styles.date}>Date: {event.date}</Text>
            <Text style={styles.description}>{event.description}</Text>
          </>
        ) : (
          <Text>Loading event...</Text>
        )}
      </ScrollView>
    );
  }

  // ---- list view ----
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      {loading ? <Text>Loading events...</Text> : events.length === 0 ? <Text>No events found.</Text> : null}
      {events.map(e => (
        <TouchableOpacity
          key={e.id}
          style={styles.card}
          onPress={() => router.setParams({ id: String(e.id) })}
        >
          <Text style={styles.cardTitle}>{e.name}</Text>
          <Text>{e.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 100, flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  card: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 15, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 5 },
  back: { fontSize: 16, color: '#208AEF', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  date: { fontSize: 16, color: '#666', marginBottom: 15 },
  description: { fontSize: 16, lineHeight: 24 },
});