import { API_URL } from '@/constants/api';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Feed, FeedItem } from '@/components/feed';

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
    <Feed title="Announcements">
      {announcements.map(announcement => (
        <FeedItem
          key={announcement.id}
          title={announcement.title}
          body={announcement.description}
        />
      ))}
    </Feed>
  );
}