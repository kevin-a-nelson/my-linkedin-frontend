
import React, { useEffect, useState } from 'react';
import SocialMediaPost from '../SocialMediaPost/SocialMediaPost';
import axios from 'axios'

import PostModal from '../PostModal/PostModal';

function HomePage({ user, setCurrentPage }) {
    const [postsResponse, setPostsResponse] = useState([]);
    const [showModal, setShowModal] = useState(false);

    async function fetchPosts() {
        try {
            const response = await axios.get('https://localhost:7227/api/Posts');
            setPostsResponse(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleMakeAPost = () => {
        setShowModal(true);
    }

    function Posts() {
        return postsResponse.map((postResponse, idx) => {
            return <SocialMediaPost key={`social-media-post-${idx}`} postResponse={postResponse} setCurrentPage={setCurrentPage} />
        })
    }

    return (
        <div>
            <div style={{ height: '20px' }}></div>
            <button onClick={handleMakeAPost}>Make a Post</button>
            <PostModal showModal={showModal} setShowModal={setShowModal} fetchPosts={fetchPosts}/>
            {Posts()}
        </div>
    )
}

export default HomePage;