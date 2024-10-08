import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Request from "./Request";
import { useLocation } from 'react-router-dom';
import './volunteerPage.css';
import { getRequests } from '../httpController'; 
import SearchRequest from "./SearchRequest";
const VolunteerPage = () => {
  const location = useLocation();
  const volunteerId = location.state.userId;
  const [requests, setRequests] = useState([]);
  const [searchRequests, setSearchRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("meals"); 
const[isExist,setIsExist]=useState(false)
  useEffect(() => {
    const socket = io('http://localhost:8082');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('addRequest', (newRequest) => {
      getRequests(filter, setRequests, setLoading); 
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    getRequests(filter, setRequests, setLoading);
    return () => {
      socket.disconnect();
    };
  }, [filter]);

  return (
    <div className="volunteer-page">
      {loading ? (
        <div className="loader">
        </div>
      ) : (
        <>
          <div>
            <button onClick={() => { setFilter("meals") }}>ארוחה</button>
            <button onClick={() => setFilter("babysitter")}>בייבי סיטר</button>
            <button onClick={() => setFilter("cleaning")}>נקיון</button>
            <button onClick={() => setFilter("shopping")}>קניות</button>
            <button onClick={() => setFilter("support")}>אוזן קשבת</button>
          </div>
          <SearchRequest setIsExist={setIsExist} setSearchRequests={setSearchRequests}  setRequests={setRequests} allRequests={requests} />
          <div className="requests_container">
            {(searchRequests.length > 0 ? (
              searchRequests.map((request, index) => (
                <div key={index}>
                  <Request volunteerId={volunteerId} object={request} requests={requests} setRequests={setRequests} />
                </div>
              ))
            ) :(isExist?   <h2>אין בקשות באיזור זה</h2>:(
              requests.length > 0 ? (
                requests.map((request, index) => (
                  <div key={index}>
                    <Request volunteerId={volunteerId} object={request} requests={requests} setRequests={setRequests} />
                  </div>
                ))):(
              <h2>אין בקשות מסוג זה</h2>)
            )))}
          </div>
          
        </>
      )}
    </div>
  );
};

export default VolunteerPage;
