//this file is used for all of the routing in the application
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './components/MainPage';


const App = () => {
    return (
        <div>
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </Router>
        </div>
    );
};

export default App;