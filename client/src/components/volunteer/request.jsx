import React, { useEffect } from "react";
import { updateRequest } from "../httpController"; 
import GenericRequest from "./GenericRequest"; 
import { io } from "socket.io-client";

const Request = ({ object, setRequests, requests, volunteerId }) => {
    useEffect(() => {
        const socket = io('http://localhost:8082');

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleButtonClick = async (id) => {
        const confirmed = window.confirm('האם אתה בטוח שברצונך לקחתי?');
        if (confirmed) {
            try {
                await updateRequest(id, volunteerId, object.email);
                alert(" !!תזכי למצוות ");
                const updatedRequests = requests.filter(item => item.requestId !== object.requestId);
                setRequests(updatedRequests);
                console.log(updatedRequests);
            } catch (error) {
                console.error('Error updating request:', error.message);
            }
        }
    };

    return (
        <div className="request">
            <GenericRequest object={object} />
            <button onClick={() => handleButtonClick(object.requestId)}>לקחתי</button>
        </div>
    );
};

export default Request;
