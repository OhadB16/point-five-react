import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

type EventTypeSelectProps = {
  eventTypes: string[];
  filterType: string;
  onFilterTypeChange: (value: string) => void; // Accept a string directly
};

const EventTypeSelect: React.FC<EventTypeSelectProps> = ({
  eventTypes,
  filterType,
  onFilterTypeChange,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value || '';
    onFilterTypeChange(newValue); // Pass the new value directly
  };

  return (
    <Select
      value={filterType}
      onChange={handleChange}
      sx={{ margin: 2, marginRight: 3, width: '50%' }}
      displayEmpty
      inputProps={{ 'aria-label': 'Select Event Type' }}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {eventTypes.map((type) => (
        <MenuItem key={type} value={type}>
          {type}
        </MenuItem>
      ))}
    </Select>
  );
};

export default React.memo(EventTypeSelect);
