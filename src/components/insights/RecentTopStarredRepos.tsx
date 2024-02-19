import React from 'react';
import RecentEventsProps from '../shared/props/RecentEventsProps';
import { EventItem } from '../../models/EventItem';
import EventRecentInsight from '../shared/EventRecentInsight';

const RecentTopStarredRepos: React.FC<RecentEventsProps> = ({ events }) => {
  const recentRepositoriesEvents = React.useMemo(() => {
    const reposMap = new Map<number, EventItem>();

    // Iterate over all events to build a map of the most recent event for each repository
    events.forEach(event => {
      const repoId = event.repo.id;
      // Check if this is the most recent event for this repo
      if (!reposMap.has(repoId) || new Date(reposMap.get(repoId)!.created_at) < new Date(event.created_at)) {
        reposMap.set(repoId, event);
      }
    });

    // Convert the map values to an array, sort by the 'created_at' field, and take the top 20
    const sortedRecentEvents = Array.from(reposMap.values())
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 20);

    return sortedRecentEvents;
  }, [events]);

  return (
    <>
      <EventRecentInsight title={'Recent Top Starred Repos'} insightEvents={recentRepositoriesEvents} />
    </>
  );
};

export default RecentTopStarredRepos;
