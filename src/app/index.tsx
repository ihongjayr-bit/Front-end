import { API_URL } from '@/constants/api';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Avatar, Feed, FeedItem, Message } from '../components/feed';
import { colors } from '../constants/ui';

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
      <Feed title="Event" onBack={() => router.setParams({ id: undefined })}>
        {event ? (
          <View style={styles.detail}>
            <View style={styles.detailHead}>
              <Avatar name={event.name} size={52} />
              <Text style={styles.detailTitle}>{event.name}</Text>
            </View>
            <Text style={styles.detailBody}>{event.description}</Text>
            <View style={styles.dateRow}>
              <Text style={styles.dateText}>Date: {event.date}</Text>
            </View>
          </View>
        ) : (
          <Message>Loading event...</Message>
        )}
      </Feed>
    );
  }

  // ---- list view ----
  return (
    <Feed title="Upcoming Events">
      {loading ? (
        <Message>Loading events...</Message>
      ) : events.length === 0 ? (
        <Message>No events found.</Message>
      ) : null}
      {events.map(e => (
        <FeedItem
          key={e.id}
          title={e.name}
          body={e.description}
          onPress={() => router.setParams({ id: String(e.id) })}
        />
      ))}
    </Feed>
  );
}

const styles = StyleSheet.create({
  detail: { padding: 16 },
  detailHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  detailTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  detailBody: { fontSize: 18, lineHeight: 27, color: colors.textBody },
  dateRow: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  dateText: { fontSize: 15, color: colors.textMuted },
});