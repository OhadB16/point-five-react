import React from 'react';
import { Box, Typography, Button } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import SumMessageBadge from './shared/SumMessageBadge' // Adjust the path as necessary

type AppHeaderProps = {
    totalEventsMessage: string;
    handleRefresh: () => void;
};

const AppHeader: React.FC<AppHeaderProps> = ({ totalEventsMessage, handleRefresh }) => {
    const HEADER_TITLE = 'Github Monitor';
    const REFERSH_BUTTON_LABEL = 'Refresh';
    const HEADER_DESCRIPTION = 'Keep track of Github events and trends';

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
            {HEADER_TITLE}
          </Typography>
          <SumMessageBadge text={totalEventsMessage} />
        </Box>

        <Box sx={{ marginRight: 4 }}>
          <Button 
            variant="contained" 
            style={{ backgroundColor: '#b666d2', color: 'white' }} 
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            {REFERSH_BUTTON_LABEL}
          </Button>
        </Box>
      </Box>

      <Typography sx={{ fontSize: 16, color: '#c0c0c0' }}>
        {HEADER_DESCRIPTION}
      </Typography>
    </>
  );
};

export default React.memo(AppHeader);
