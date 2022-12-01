
import React from 'react';
import Nav from './Nav';
import "./App.css";
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeeForm from './AttendeeForm';
import PresentationForm from './PresentationForm';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
        <div className="container">
          <Routes>
            {/* <Route path="/" element={<App />}></Route> */}
            <Route path="locations">
              <Route path="new" element={<LocationForm/>} />
            </Route>
            <Route path="conferences/new" element={<ConferenceForm />} />
            <Route path="attendees" element={<AttendeesList attendees={props.attendees} />} />
            <Route path="attendees/new" element={<AttendeeForm />}  />
            <Route path="presentations/new" element={<PresentationForm />} />

          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
