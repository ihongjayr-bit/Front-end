import { API_URL } from '@/constants/api';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Feed, FeedItem } from '@/components/feed';

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
    <Feed title="Organizations">
      {organizations.map(org => (
        <FeedItem key={org.id} title={org.name} body={org.description} />
      ))}
    </Feed>
  );
}