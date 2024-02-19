import React from 'react';
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import { EventItem } from './models/EventItem';
import EventItemBox from './components/events/EventItemBox';
import useFetchEvents from './hooks/useFetchEvents';
import RecentActors from './components/insights/RecentActors';
import RecentTopStarredRepos from './components/insights/RecentTopStarredRepos';
import EventTypeSelect from './components/events/EventTypeSelect';
import EventSearch from './components/events/EventSearch';
import AppHeader from './components/AppHeader';

const EventItemDialog = React.lazy(() => import('./components/events/EventItemDialog')); 

function App() {
  const URL = `http://localhost:8080/events`;

  const [refreshFlag, setRefreshFlag] = React.useState(false);
  const { results: events, loading } = useFetchEvents(URL, refreshFlag);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterType, setFilterType] = React.useState('');
  const [eventTypes, setEventTypes] = React.useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = React.useState<EventItem | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [filteredEvents, setFilteredEvents] = React.useState<EventItem[]>([]);

  const totalEventsMessage = events ? `${events.length} Events Collected` : 'No Events Collected'

  React.useMemo(() => {
    if (!events) return;
  
    const uniqueEventsMap = new Map();
    events.forEach(event => {
      const combinedLabel = `${event.actor.login} / ${event.repo.name} (${event.id})`.toLowerCase();
      if (combinedLabel.includes(searchTerm.toLowerCase()) &&
          (!filterType || event.type.toLowerCase() === filterType.toLowerCase())) {
        // Use event.id or a composite key as the unique identifier
        uniqueEventsMap.set(event.id, event);
      }
    });
  
    setFilteredEvents(Array.from(uniqueEventsMap.values()));
  }, [events, searchTerm, filterType]);

  
  React.useEffect(() => {
    if (filteredEvents) {
      const types = Array.from(new Set(filteredEvents.map(event => event.type)));
      setEventTypes(types);
    }
  }, [filteredEvents]);

  const handleSearchTermChange = (value: string | undefined) => {
    if (value !== undefined) {
      setSearchTerm(value);
    }
  };

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value); 
  };
  

  const handleEventItemClick = (eventItem: EventItem) => {
    setSelectedEvent(eventItem);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEvent(null);
  };
  
  const handleRefresh = () => {
    setRefreshFlag(!refreshFlag);
  };


  return (
      <>
        <Box component='div' sx={{ display: 'flex', justifyContent: 'center', marginLeft: 2, height:'100%', minHeight: '750px',
                width: '98%',  border: '1px solid #d3d3d3', borderRadius: 8, marginTop:2, margin: 1 }}>

          <Box component='div' className="App" style={{ width: '100%' }}> 

            <Box sx={{ marginLeft: 2, marginTop: 2 }}>
                <AppHeader
                  totalEventsMessage={totalEventsMessage}
                  handleRefresh={handleRefresh}
                />
            </Box>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginY: 4 }}>
                  <CircularProgress size={80} /> 
                </Box>
              )}


            {!loading && (
            
            <Box sx={{ display: 'flex', margin: 1, marginLeft: 6, justifyContent:'center', marginTop: 9 }}>
              <Box sx={{ width: '55%',  border: '1.2px solid #000000', borderRadius: 8, overflowY:'scrol' }}>
                  
                  <Typography sx={{ fontSize: '18px', marginBottom: 2, margin:2, fontWeight: 'bold' }}>
                    Events
                  </Typography>
                  
                <Box sx={{ width: '90%', display: 'flex', marginBottom: 2 }}>

                  <EventSearch
                    events={events}
                    setSelectedEvent={setSelectedEvent}
                    setFilteredEvents={setFilteredEvents}
                    searchTerm={searchTerm}
                    onSearchTermChange={(event, value) => handleSearchTermChange(value)}
                  />
                      
                  <EventTypeSelect
                    eventTypes={eventTypes}
                    filterType={filterType}
                    onFilterTypeChange={handleFilterTypeChange}
                  />


                </Box>
                <Box sx={{ margin: 2, marginRight: 3, width: '95%', maxWidth: 900, height: '100%', maxHeight: '460px', overflowX: 'hidden', overflowY: 'auto',
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
                    <Grid container spacing={2}>
                    {filteredEvents.length === 0 && searchTerm !== ''  ? 
                            <Typography sx={{ textAlign: 'center', fontSize: 30, margin: 20 }}>
                              No events found matching your search criteria.
                            </Typography> 
                            :
                      filteredEvents.map((event, index) => (
                        <Grid item xs={12} sm={6} md={6} key={event.id} onClick={() => handleEventItemClick(event)}>
                          <EventItemBox item={event}  />
                        </Grid>
                      ))}
                  </Grid>
                </Box>

                </Box>

                <Box sx={{ width: '35%', marginLeft: 5 }}>

                    <RecentTopStarredRepos events={events} />

                    <RecentActors events={events} />

                <Box/>
                  
              {selectedEvent && (
                  <React.Suspense>
                    <EventItemDialog
                      open={dialogOpen}
                      onClose={handleCloseDialog}
                      eventItem={selectedEvent}
                    />
                </React.Suspense>
              )}
                </Box>
            </Box>
            )}
          </Box>
          </Box>

        </>
  );
}

export default App;
