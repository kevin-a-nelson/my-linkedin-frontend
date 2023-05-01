
import React, { useEffect, useState } from 'react';
import SocialMediaPost from '../SocialMediaPost/SocialMediaPost';
import axios from 'axios'


function HomePage({user, setCurrentPage}) {
    const [postsResponse, setPostsResponse] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get('https://localhost:7227/api/Posts');
                setPostsResponse(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPosts();
    }, []);

    function Posts() {
        return postsResponse.map((postResponse, idx) => {
            return <SocialMediaPost key={`social-media-post-${idx}`} postResponse={postResponse} setCurrentPage={setCurrentPage}/>
        })
    }

    return (
        <div>
            {Posts()}
        </div>
    )
}

export default HomePage;