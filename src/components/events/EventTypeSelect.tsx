import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

type EventTypeSelectProps = {
  eventTypes: string[];
  filterType: string;
  onFilterTypeChange: (event: SelectChangeEvent<string>) => void;
};

const EventTypeSelect: React.FC<EventTypeSelectProps> = ({
  eventTypes,
  filterType,
  onFilterTypeChange,
}) => {
  return (
    <Select
      value={filterType}
      onChange={onFilterTypeChange}
      sx={{ margin: 2, marginRight: 3, width: '50%' }}
      displayEmpty
      inputProps={{ 'aria-label': 'Select Event Type' }}
    >
      {/* Default option */}
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {/* List of event types */}
      {eventTypes.map((type) => (
        <MenuItem key={type} value={type}>
          {type}
        </MenuItem>
      ))}
    </Select>
  );
};

export default React.memo(EventTypeSelect);
