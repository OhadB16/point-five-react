// useFetchEvents hook
import React from "react";
import { EventItem } from "../models/EventItem";

type FetchEventResult = {
  results: EventItem[];
  loading: boolean;
  error: Error | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const useFetchEvents = (url: string, refreshDependency: boolean): FetchEventResult => {
  const [events, setEvents] = React.useState<EventItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    setLoading(true); // Ensure loading is true at the start of the fetch
    const fetchEvents = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setEvents(data);
        setError(null); // Reset any previous errors
        console.log(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    // Only re-fetch when refreshDependency changes
  }, [url, refreshDependency]);

  return { results: events, loading, error, setLoading };
};

export default useFetchEvents;
