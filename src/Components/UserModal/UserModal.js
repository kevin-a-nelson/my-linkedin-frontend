import React, { useEffect, useState } from "react";

import { useCookies } from "react-cookie";
import axios from "axios";
import "./UserModal.css"
import Cookies from "react-cookie";


const UserModal = ({ setShowModal, showModal, user, fetchUser, modalMode }) => {
    const [headline, setHeadline] = useState(user.headline);
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);

    const closeModal = () => {
        setShowModal(false);
    };


    const updateUser = async () => {
        console.table({
            userId: user.id,
            headline: headline,
            userName: user.userName,
            password: user.password,
            name: name,
            avatar: avatar,
        })
        // console.log(experience)
        try {
            const response = await axios.put(`https://localhost:7227/api/users/${user.id}`,
                {
                    id: user.id,
                    headline: headline,
                    userName: user.userName,
                    password: user.password,
                    name: name,
                    avatar: avatar,
                })
            fetchUser()
        } catch (error) {
            console.log(error)
        }
        // TODO: handle form submission
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        updateUser();
        closeModal();
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleProfilePicChange = (e) => {
        setAvatar(e.target.value);
    }

    const handleHeadlineChange = (e) => {
        setHeadline(e.target.value);
    }

    // if (!experience) {
    //     return
    // }

    return (
        <div className={`modal ${showModal ? "show" : ""}`}>
            <div className="modal-content">
                <label htmlFor="company-input">Name</label>
                <input
                    type="text"
                    id="company-input"
                    value={name}
                    onChange={handleNameChange}
                />
                <label htmlFor="job-title-input">Headline</label>
                <input
                    type="text"
                    id="company-input"
                    value={headline}
                    onChange={handleHeadlineChange}
                />
                <label htmlFor="job-title-input">Profile Picture</label>
                <input
                    type="text"
                    id="company-input"
                    value={avatar}
                    onChange={handleProfilePicChange}
                />
                <div className="button-container">
                    <button onClick={handleSubmitForm} type="submit">Submit</button>
                    <button className="cancel-button" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
