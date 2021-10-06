import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NaVar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActiivty, setSelectedActivity] = useState<Activity | undefined>(undefined);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
    setActivities(response.data);
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id ===id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }
  return (
    <>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
      <ActivityDashboard
       activities = {activities}
       selectedActivity = {selectedActiivty}
       selectActivity = {handleSelectActivity}
       cancelSelectActivity = {handleCancelSelectActivity} />
      </Container>
        
    </>
  );
}

export default App;
