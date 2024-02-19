import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { EventItem } from '../../models/EventItem';
import SumMessageBadge from '../shared/SumMessageBadge';
import { Repository } from '../../models/Repository';

interface EventRecentInsightProps {
  title: string;
  insightEvents: EventItem[]; 
}

const EventRecentInsight: React.FC<EventRecentInsightProps> = ({ title, insightEvents }) => {

  const isActor = title === 'Recent Actors'; 

  const getStarCount = (repo: Repository) => {
      return repo ? (repo.stargazers_count ? repo.stargazers_count.toString() : 'N/A') : 'N/A';
  }

  return (
    <Box sx={{ 
      width: '90%', 
      border: '1.2px solid #000000', 
      borderRadius: 8, 
      marginBottom: 2, 
      height: '50%', 
      overflowY: 'scroll', // Always show the scrollbar
      WebkitOverflowScrolling: 'touch', // Enable smooth scrolling on touch devices
      padding: 2, 
      maxHeight: '280px',
      "&::-webkit-scrollbar": {
        width: '0px', // Hide the scrollbar
        background: 'transparent', // Make the scrollbar background transparent
      },
      "&:hover": {
        "&::-webkit-scrollbar-thumb": {
          background: '#888', // Change thumb color on hover
        }
      }
    }}>
      <Typography sx={{ fontSize: 18, marginBottom: 2, fontWeight: 'bold' }}>
      {isActor ? 'Recent Actors' : 'Top Starred Repos'}
      </Typography>
      <Box component='div' sx={{marginLeft: 3}}>
            {insightEvents.map((insightEvent, index) => (
        <Grid container key={index} spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <Typography sx={{ color: '#080808', fontWeight: 600, fontSize: 12 }}>
              {isActor ? insightEvent.actor.login : insightEvent.repo.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <SumMessageBadge text={isActor ? insightEvent.created_at :(getStarCount(insightEvent.repo))} />
          </Grid>
        </Grid>
      ))}   
        </Box>
      </Box>
      );
};

export default EventRecentInsight;
