import './Connections.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

function Connections() {
    const [friendRequests, setFriendRequests] = useState([]);
    const [cookies, setCookie] = useCookies(['userId', 'jwt']);
    const [friends, setFriends] = useState([]);


    async function fetchFriendRequests() {
        try {
            const response = await axios.get(`https://localhost:7227/api/Users/${cookies.userId}/friendRequests`);
            setFriendRequests(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function createFriend(friendRequest) {
        try {
            const response = await axios.post(`https://localhost:7227/api/friendships`, {
                requesterUserId: friendRequest.requestingUser.id,
                recieverUserId: cookies.userId,
            });
        } catch(error) {
            console.log(error)
        }
    }

    async function fetchFriends() {
        try {
            const response = await axios.get(`https://localhost:7227/api/users/${cookies.userId}/friends`)
            setFriends(response.data)
        } catch(error) {
            console.log(error)
        }
    }
    
    async function deleteFriendRequest(friendRequest) {
        try {
            const response = await axios.delete(`https://localhost:7227/api/friendrequests/${friendRequest.friendRequest.id}`, {
                requestingUserId: friendRequest.requestingUser.id,
                recievingUserId: cookies.userId,
            });
        } catch(error) {
            console.log(error)
        }
    }

    async function onAccept(friendRequest) {
        await createFriend(friendRequest)
        await deleteFriendRequest(friendRequest)
        await fetchFriendRequests();
        fetchFriends();
    }

    async function onReject(friendRequest) {
        await deleteFriendRequest(friendRequest)
        fetchFriendRequests();
    }

    useEffect(() => {
        fetchFriendRequests();
        fetchFriends();
    }, []);

    return (
        <div>
            <div className='post-container'>
                <h3>Connection Requests</h3>
            </div>
            {
                friendRequests.map((friendRequest, idx) => {
                    console.log(friendRequest)
                    return (
                        <div key={idx} className="post-container">
                            <div className="friend-request" style={{display: 'flex'}}>
                                <div className="post-header">
                                    <img className="avatar" src={friendRequest.requestingUser.avatar} alt="User Avatar" />
                                    <div style={{ display: "block" }}>
                                        <div className="post-header-text">
                                            <Link className="post-author" to={`/profile/${friendRequest.requestingUser.username}`}>
                                                <h2 className="username">{friendRequest.requestingUser.name}</h2>
                                            </Link>
                                        </div>
                                        <span style={{fontSize: "12px"}} className="headline">CEO of Microsoft</span>
                                    </div>
                                </div>
                                <button onClick={() => onAccept(friendRequest)} class="btn accept-request">✔</button>
                                <div style={{width: "10px"}}></div>
                                <button onClick={() => onReject(friendRequest)} class="btn deny-request" >X</button>
                            </div>
                        </div>
                    )
                })
            }
            <div className='post-container'>
                <h3>Friends</h3>
            </div>
            {
                friends.map((friend, idx) => {
                    console.log(friend)
                    return (
                        <div key={idx} className="post-container">
                            <div className="friend-request" style={{display: 'flex'}}>
                                <div className="post-header">
                                    <img className="avatar" src={friend.avatar} alt="User Avatar" />
                                    <div style={{ display: "block" }}>
                                        <div className="post-header-text">
                                            <Link className="post-author" to={`/profile/${friend.userName}`}>
                                                <h2 className="username">{friend.name}</h2>
                                            </Link>
                                        </div>
                                        <span style={{fontSize: "12px"}} className="headline">CEO of Microsoft</span>
                                    </div>
                                </div>
                                {/* <button onClick={() => onAccept(friend)} class="btn accept-request">✔</button>
                                <div style={{width: "10px"}}></div>
                                <button onClick={() => onReject(friend)} class="btn deny-request" >X</button> */}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Connections;