import React from 'react';
import { Box, Typography } from "@mui/material";
import { EventItem } from '../../models/EventItem';

type EventItemProps = {
    item: EventItem;
};

const EventItemBox: React.FC<EventItemProps> = ({ item }) => {

  const createdDate = new Date(item.created_at);
  const formattedDate = createdDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <>
  <Box sx={{
    overflowY: 'hidden',
    overflowX: 'hidden',
    width: '95%',
    height: '100%',
    border: '1.3px solid #000000',
    backgroundColor: '#f8f8ff',
    maxHeight: '100px',
    borderRadius: 8,
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#BBE4EE',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    }
  }}>

    <Box  sx={{ display: 'flex', marginTop: 1, marginBottom: 1, overflowX: 'hidden' }}>
        <Typography sx={{
        textAlign: 'left',
        fontWeight: 600,
        marginLeft: 1.5,
        fontSize: 12,
        whiteSpace: 'nowrap'  
      }}>
        {item.id} {`(${item.type})`} - {formattedDate}
      </Typography>
    </Box>
    <Box  sx={{ display: 'flex', marginTop: 1, marginBottom: 1, overflowX: 'hidden' }}>
      <Typography sx={{
        textAlign: 'left',
        marginLeft: 1.5,
        fontSize: 12,
        color: '#c0c0c0',
        whiteSpace: 'nowrap'  
      }}>
        Actor: {item.actor.login} ({item.repo.url}) {`(${item.actor.avatar_url})`}
      </Typography>
    </Box>

    <Box sx={{ display: 'flex', marginTop: 1, marginBottom: 1, overflowX: 'hidden' }}>
      <Typography sx={{
        textAlign: 'left',
        marginLeft: 1.5,
        fontSize: 12,
        color: '#c0c0c0',
        whiteSpace: 'nowrap'  // This prevents the text from wrapping
      }}>
        Repo: {item.repo.name} ({item.repo.url})
      </Typography>
    </Box>
  </Box>
    </>
  );
};

export default React.memo(EventItemBox);
