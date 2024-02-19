import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Fade, Link } from '@mui/material';
import { EventItem } from '../../models/EventItem'; 

interface EventItemDialogProps {
  open: boolean;
  onClose: () => void;
  eventItem: EventItem;
}

const EventItemDialog: React.FC<EventItemDialogProps> = ({ open, onClose, eventItem }) => {
  const DIALOG_TITLE = 'Event Details';
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Fade}
      sx={{ color: '#333', margin: 'auto', borderRadius: 1, minWidth: '500px', minHeight: '300px', textAlign: 'center' }}>
      <DialogTitle sx={{ backgroundColor: '#BBE4EE', color: '#696969', padding: 2, borderTopLeftRadius: 1, borderTopRightRadius: 1 }}>
        <Box sx={{ fontSize: 18, fontWeight: 600 }}>
           {DIALOG_TITLE}
        </Box>
      </DialogTitle>
      <DialogContent sx={{ minWidth: '250px', minHeight: '250px' }}>
        {eventItem ? (
          <>
            <Box sx={{ margin: 2 }}>ID: {eventItem.id}</Box>
            <Box sx={{ margin: 2 }}>Type: {eventItem.type}</Box>
            <Box sx={{ margin: 2 }}>Actor Login: {eventItem.actor.login}</Box>
            <Box sx={{ margin: 2 }}>
            Actor URL:  <br/><Link href={eventItem.actor.avatar_url} target="_blank" rel="noopener noreferrer">{eventItem.actor.avatar_url}</Link>
            </Box>
            <Box sx={{ margin: 2 }}>Repo Name: {eventItem.repo.name}</Box>  
            <Box sx={{ margin: 2 }}>
            Repo URL: <br/><Link href={eventItem.repo.url} target="_blank" rel="noopener noreferrer">{eventItem.repo.url}</Link> 
            </Box>
            <Box sx={{ margin: 2 }}>Action: {eventItem.payload ? eventItem.payload.action : "N/A"}</Box>
            <Box sx={{ margin: 2 }}>Public: {eventItem.public ? 'Yes' : 'No'}</Box>
            <Box sx={{ margin: 2 }}>Created At: {eventItem.created_at}</Box>
          </>
        ) : (
          <Box sx={{ margin: 2 }}>No event details available.</Box> // Fallback content if eventItem is undefined
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(EventItemDialog);
