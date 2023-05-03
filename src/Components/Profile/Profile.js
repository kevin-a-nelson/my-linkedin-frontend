import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import UserModal from "../UserModal/UserModal";
import axios from "axios";

import JobModal from "../JobModal/JobModal";
import { useCookies } from "react-cookie";
import { buildQueries } from "@testing-library/react";

const jobs = []

const ProfilePage = () => {
    const { username } = useParams()
    const [experiences, setExperiences] = useState([])
    const [user, setUser] = useState({});
    const [modalMode, setModalMode] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false)
    const [cookies, setCookie] = useCookies(['username', 'jwt', 'userId'])
    const [experienceBeingEdited, setExperienceBeingEdited] = useState({})

    async function fetchJobs() {
        try {
            const response = await axios.get(`https://localhost:7227/api/Users/username/${username}/profile`);
            setExperiences(response.data.experiences)
            setUser(response.data.user)
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchUser() {
        try {
            const response = await axios.get(`https://localhost:7227/api/Users/${cookies.userId}`);
            setUser(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    if (!user) {
        return
    }

    function onEditClick(experience) {
        setExperienceBeingEdited(experience)
        setModalMode('edit')
        setShowModal(true)
    }

    function onAddExperineceClick() {
        setExperienceBeingEdited({})
        setModalMode('create')
        setShowModal(true)
    }

    function onProfileEdit() {
        setShowEditUserModal(true)
    }

    async function onConnect() {
        try {
            const response = await axios.post(`https://localhost:7227/api/friendRequests`, {
                requesterUserId: cookies.userId,
                recieverUserId: user.id,
            })
        } catch(error) {
            console.log(error)
        }
    }


    return (
            <div className="container">
                {showModal ?
                    <JobModal modalMode={modalMode} fetchJobs={fetchJobs} setShowModal={setShowModal} showModal={showModal} experience={experienceBeingEdited} />
                    :
                    null
                }
                {
                    showEditUserModal ?
                        <UserModal setShowModal={setShowEditUserModal} showModal={showEditUserModal} user={user} fetchUser={fetchUser} modalMode={modalMode} />
                        :
                        null
                }
                <div className="profile-container">
                    <img
                        src={user.avatar}
                        alt="Profile"
                        className="profile-image"
                    />
                    <h1 style={{padding: "0px", margin: "0px"}}>{user.name}</h1>
                    <span style={{paddingTop: "3px", paddingBottom: "10px"}}>{user.headline}</span>
                    {
                        cookies.username === username ?
                            <button onClick={onProfileEdit} className="add-friend-button">Edit</button>
                            :
                            <button onClick={onConnect} className="add-friend-button">Connect</button>
                    }
                </div>
                <div className="job-container">
                    <h2>Work Experience</h2>
                    {
                        cookies.username === username ?
                            <div>
                                <button className="add-friend-button" onClick={() => onAddExperineceClick({})}>Add an experience</button>
                                <div style={{ height: '20px' }}></div>
                            </div>
                            :
                            null
                    }
                    {experiences.map((experience, idx) => (
                        <div key={idx} className="job-card">
                            <p>{experience.companyName}</p>
                            <button onClick={() => onEditClick(experience)} className={`job-card-edit-button ${cookies.username === username ? 'show' : ""}`}>Edit</button>
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
