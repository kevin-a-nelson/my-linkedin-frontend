
import './App.css';
import React, { useState, useEffect } from 'react';

function friendRequests() {
    const [friendRequests, setFriendRequests] = useState(null);

    useEffect(async () => {
        try {
            const response = await axios.get(`https://localhost:7227/api/Users/${cookies.userId}`);
            setFriendRequests(response.data)
        } catch (error) {
        }
    }, []);

    return (
        <div className="App">
        </div>
    );
}

export default friendRequests;
