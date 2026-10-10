import { API_URL } from '@/constants/api';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Feed, FeedItem } from '@/components/feed';

export default function VenuesScreen() {
  const [venues, setVenues] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/venues`)
      .then(res => setVenues(res.data.venues || res.data))
      .catch(err => console.error('Error fetching venues:', err.message));
  }, []);

  return (
    <Feed title="Venues">
      {venues.map(v => (
        <FeedItem key={v.id} title={v.name} body={v.location} />
      ))}
    </Feed>
  );
}