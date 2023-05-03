import React, { useState } from "react";

import { useCookies } from "react-cookie";
import axios from "axios";
import "./PostModal.css"

const PostModal = ({ showModal, setShowModal, fetchPosts }) => {
    const [text, setText] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [cookies, setCookie] = useCookies(['userId', 'jwt'])

    const closeModal = () => {
        setShowModal(false);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
    };

    const createAPost = async () => {
        console.log(cookies.userId)
        try {
            const response = await axios.post('https://localhost:7227/api/Posts', {
                userId: cookies.userId,
                text: text,
                image: imageUrl,
            });

            fetchPosts();

        } catch (error) {
            console.error(error.message);
        }
        // TODO: handle form submission
    };


    const handleSubmit = (e) => {
        createAPost();
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        handleSubmit(text, imageUrl);
        closeModal();
    };

    return (
        <div className={`modal ${showModal ? "show" : ""}`}>
            <div className="modal-content">
                <label htmlFor="text-input">Text:</label>
                <input
                    type="text"
                    id="text-input"
                    value={text}
                    onChange={handleTextChange}
                />
                <label htmlFor="image-url-input">Image URL:</label>
                <input
                    type="text"
                    id="image-url-input"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                />
                <div className="button-container">
                    <button onClick={handleSubmitForm} type="submit">Submit</button>
                    <button className="cancel-button" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default PostModal;
