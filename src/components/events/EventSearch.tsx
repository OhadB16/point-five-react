import React from 'react';
import { Autocomplete, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { EventItem } from '../../models/EventItem';

type EventSearchProps = {
  events: EventItem[];
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<{}>, value: string) => void; // Adjusted signature
  setSelectedEvent: (event: EventItem | null) => void;
  setFilteredEvents: (events: EventItem[]) => void;
};

const EventSearch: React.FC<EventSearchProps> = ({
  events,
  searchTerm,
  onSearchTermChange,
  setSelectedEvent,
  setFilteredEvents
}) => {
  return (
    <Autocomplete
      options={events}
      sx={{ margin: 2, marginRight: 3, width: '50%' }}
      getOptionLabel={(option) => `${option.actor.login} / ${option.repo.name}`}
      inputValue={searchTerm}
      onInputChange={(event, value, reason) => {
        if (reason === 'input') onSearchTermChange(event, value);
      }}
      onChange={(event, value: EventItem | null) => {
        setSelectedEvent(value); // Set the selected event
        if (value) {
          setFilteredEvents([value]); // Filter events to show only the selected one
        } else {
          setFilteredEvents(events); // No selection, show all events
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search by Actor, Repo"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: <SearchIcon color="action" />,
          }}
        />
      )}
    />
  );
};

export default React.memo(EventSearch);
