import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import NavBar from './components/navBar/NavBar';
import Volunteer from './components/volunteer/Volunteer';
import VolunteerLayout from './components/volunteer/Layout';
import VolunteerPage from './components/volunteer/VolunteerPage';
import HelpRequestPage from './components/helpRequest/HelpRequestPage';
import HelpRequest from './components/helpRequest/HelpRequest';
import HelpRequestLayout from './components/helpRequest/Layout';
import ProtectedRoute from './protectRoute';
import PersonalProfile from './components/personalProfile/PersonalProfile';

function App() {
    return (
        <Router>
            <div><NavBar /></div>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home/contact" element={<Home scrollToContact={true} />} />

                <Route path="/helpRequest" element={<HelpRequestLayout />}>
                    <Route index element={<HelpRequest />} />
                    <Route path="login" element={<Login />} />
                    <Route path="requests" element={
                        <ProtectedRoute>
                            <HelpRequestPage />
                        </ProtectedRoute>
                    } />
                    <Route path="register" element={<Register />}>
                        <Route path="details" element={<Register />} />
                    </Route>
                </Route>
                <Route path="register" element={<Register />}>
                    <Route path="details" element={<Register />} />
                </Route>
                <Route path="login" element={<Login />} />

                <Route path="/volunteer" element={<VolunteerLayout />}>
                    <Route index element={<Volunteer />} />
                    <Route path="login" element={<Login />} />
                    <Route path="volunteers" element={
                        <ProtectedRoute>
                            <VolunteerPage />
                        </ProtectedRoute>
                    } />
                    <Route path="register" element={<Register />}>
                        <Route path="details" element={<Register />} />
                    </Route>
                </Route>

                <Route path="/profile" element={
                    <ProtectedRoute>
                        <PersonalProfile />
                    </ProtectedRoute>
                } />
                {/* <Route path="*" element={<NoPageFound />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
