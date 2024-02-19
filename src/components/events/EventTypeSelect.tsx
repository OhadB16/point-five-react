import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

type EventTypeSelectProps = {
    eventTypes: string[];
    filterType: string;
    onFilterTypeChange: (event: SelectChangeEvent<string>) => void;
};

const EventTypeSelect: React.FC<EventTypeSelectProps> = ({ eventTypes, filterType, onFilterTypeChange }) => {
  return (
    <Select
      sx={{margin: 2, marginRight: 3, width: '50%'}}
      value={filterType}
      onChange={onFilterTypeChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Select Event Type' }}
    >
      <MenuItem value="" disabled>
        Filter by Event Type
      </MenuItem>
      <MenuItem value="">Cancel Select</MenuItem> {/* Add the cancel option */}
      {eventTypes.map((type, index) => (
        <MenuItem key={index} value={type}>{type}</MenuItem>
      ))}
    </Select>
  );
};

export default React.memo(EventTypeSelect);
