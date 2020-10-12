import React from 'react';

// Materia UI components imports
import {
  Card,
  CardContent,
  Typography,
  Grid
} from '@material-ui/core';

const EventCardListing = ({ events }) => (
  <>
    <Typography variant="h5" component="h2" classes={{ root: 'events-list' }}>
        Browse the events currently available
    </Typography>
    <Grid container spacing={3}>
    {events.map(event => (
      <Grid item xs>
        <Card variant="outlined" classes={{ root: 'event-card' }} key={event}>
            <CardContent>
            <Typography variant="p" component="p">
                {event}
            </Typography>
            </CardContent>
        </Card>
      </Grid>
    ))}
    </Grid>
  </>
);

export default EventCardListing;