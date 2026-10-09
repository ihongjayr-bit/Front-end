import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Event(){
    const [events, setEvents] = useState(null);

    useEffect(() => {
        axios.get('http://192.168.56.1:8000/api/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <view>
            {events && events.map(event => (
                <li key={event.id}>{event.name}</li>
            ))}
        </view>
    );
}