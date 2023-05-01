import React, { useEffect, useState } from "react";
import "./Profile.css";
import {useParams} from "react-router-dom";
import axios from "axios";

const jobs = []

const ProfilePage = () => {
    const {username} = useParams()
    const [experiences, setExperiences] = useState([])
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchJobs() {
            try {
                const response = await axios.get(`https://localhost:7227/api/Users/username/${username}/profile`);
                setExperiences(response.data.experiences)
                setUser(response.data.user)
            } catch (error) {
                console.error(error);
            }
        }
        fetchJobs();
    }, []);

    if(!user) {
        return 
    }

    return (
        <div className="container">
            <div className="profile-container">
                <img
                    src={user.profilePic}
                    alt="Profile"
                    className="profile-image"
                />
                <h1>{user.name}</h1>
                <button className="add-friend-button">Connect</button>
            </div>
            <div className="job-container">
                <h2>Work Experience</h2>
                {experiences.map((experience) => (
                    <div key={experience.companyName} className="job-card">
                        <img
                            src={experience.companyLogoImage}
                            alt={`${experience.companyName} Logo`}
                            className="job-logo"
                        />
                        <h3 className="job-title">{experience.title}</h3>
                        <p className="job-description">{experience.description}</p>
                        <p className="job-date">{experience.startDate} - {experience.endDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;
