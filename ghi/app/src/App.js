
import React from 'react';
import Nav from './Nav';
import "./App.css";
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeeForm from './AttendeeForm';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
    <Nav />
    <div className="container">
      <LocationForm />
      <AttendeesList attendees={props.attendees} />
      <ConferenceForm />
      <AttendeeForm />

    </div>
    </>
  );
}

export default App;
