//this file is used for all of the routing in the application
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './components/MainPage';
import SingleEvent from './components/SingleEvent';
import Group from './components/GroupPage';
import GroupCreation from './components/groupCreation';


const App = () => {
    return (
        <div>
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/event/:eventID" element={<SingleEvent />}/>
                <Route path="/event" element={<SingleEvent />}/>
                <Route path="/group/:groupID" element={<Group />} />
                <Route path="/group" element={<Group />} />
                <Route path="/group-creation" element={<GroupCreation />} />
            </Routes>
        </Router>
        </div>
    );
};

export default App;