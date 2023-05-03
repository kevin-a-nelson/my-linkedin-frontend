import React, { useEffect, useState } from "react";

import { useCookies } from "react-cookie";
import axios from "axios";
import "./JobModal.css"

const modalInputs = [
    { value: "text", label: "Text", type: 'text' },
]


const JobModal = ({ setShowModal, showModal, experience, fetchJobs, modalMode }) => {
    const [description, setDescription] = useState(experience.description);
    const [company, setCompany] = useState(experience.companyName);
    const [jobTitle, setJobTitle] = useState(experience.title);
    const [imageUrl, setImageUrl] = useState(experience.companyLogoImage);
    const [startDate, setStartDate] = useState(experience.startDate);
    const [endDate, setEndDate] = useState(experience.endDate);
    const [cookies, setCookie] = useCookies(['userId', 'jwt'])

    const closeModal = () => {
        setShowModal(false);
    };


    const handleTextChange = (e) => {
        setCompany(e.target.value);
    };

    const handleJobTitleChange = (e) => {
        setJobTitle(e.target.value);
    };

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
    };

    const createAPost = async () => {
        console.log(experience)
        try {

            let response = {}

            if(modalMode === 'create') {
                response = await axios.post(`https://localhost:7227/api/Experiences`, {
                    id: 0,
                    userId: cookies.userId,
                    startDate: startDate,
                    endDate: endDate,
                    title: jobTitle,
                    companyName: company,
                    description: description,
                    companyLogoImage: imageUrl,
                });
            } else if(modalMode === 'edit') {
                response = await axios.put(`https://localhost:7227/api/Experiences/${experience.id}`, {
                    id: experience.id,
                    userId: cookies.userId,
                    startDate: startDate,
                    endDate: endDate,
                    title: jobTitle,
                    companyName: company,
                    description: description,
                    companyLogoImage: imageUrl,
                });
            }
            console.log(response.data)
            fetchJobs();
        } catch (error) {
            console.error(error);
        }
        // TODO: handle form submission
    };


    const handleSubmit = (e) => {
        createAPost();
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        handleSubmit(company, imageUrl);
        closeModal();
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    }

    if (!experience) {
        return
    }

    return (
        <div className={`modal ${showModal ? "show" : ""}`}>
            <div className="modal-content">
                <form onSubmit={handleSubmitForm}>
                    <label htmlFor="company-input">Company:</label>
                    <input
                        type="text"
                        id="company-input"
                        value={company}
                        onChange={handleTextChange}
                    />
                    <label htmlFor="job-title-input">Job Title:</label>
                    <input
                        type="text"
                        id="job-title-input"
                        value={jobTitle}
                        onChange={handleJobTitleChange}
                    />
                    <label htmlFor="image-url-input">Image URL:</label>
                    <input
                        type="text"
                        id="image-url-input"
                        value={imageUrl}
                        onChange={handleImageUrlChange}
                    />
                    <label htmlFor="image-url-input">Description:</label>
                    <textarea
                        type="text"
                        id="image-url-input"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <label htmlFor="start-date-input">Start Date</label>
                    <input
                        type="date"
                        id="image-url-input"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                    <label htmlFor="end-date-input">End Date</label>
                    <input
                        type="date"
                        id="image-url-input"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                    <div className="button-container">
                        <button type="submit">Submit</button>
                        <button className="cancel-button" onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobModal;
