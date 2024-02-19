import React from 'react';
import RecentEventsProps from '../shared/props/RecentEventsProps';
import EventRecentInsight from '../shared/EventRecentInsight';
import { EventItem } from '../../models/EventItem';

const RecentActors: React.FC<RecentEventsProps> = ({ events }) => {
  const recentActorsEvents = React.useMemo(() => {
    const actorsMap = new Map<number, EventItem>();

    const sortedEvents = events.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    sortedEvents.forEach(event => {
      if (!actorsMap.has(event.actor.id)) {
        const formattedDate = new Date(event.created_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });

        actorsMap.set(event.actor.id, {
          ...event,
          created_at: formattedDate,
        });
      }
    });

    return Array.from(actorsMap.values()).slice(0, 20);
  }, [events]);

  return (
    <>
        <EventRecentInsight title={'Recent Actors'} insightEvents={recentActorsEvents} />
    </>
  );
};

export default RecentActors;
