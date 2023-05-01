import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./SocialMediaPost.css"
import PAGES from '../../Static/Pages';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const SocialMediaPost = ({ postResponse }) => {
  const [commentsResponse, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState(null);
  const [cookies, setCookies] = useCookies(['username', 'userId']);

  useEffect(() => {
  }, []);

  async function fetchComments() {
    try {
      const response = await axios.get(`https://localhost:7227/api/post/${postResponse.post.id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCommentButtonClick() {
    setShowComments(!showComments);
    fetchComments();
  }

  async function handleLikeButtonClick() {

    if (!isLiked) {
      const response = await axios.post(`https://localhost:7227/api/Likes`, { userId: cookies.userId, postId: postResponse.post.id })
      setIsLiked(true)
    } else {
      const response = await axios.delete(`https://localhost:7227/api/Likes/userId/${cookies.userId}/postId/${postResponse.post.id}`)
      setIsLiked(false)
    }
  }

  async function handlePostButtonClick() {
    try {
      const response = await axios.post(`https://localhost:7227/api/Comments`, { userId: cookies.userId, postId: postResponse.post.id, text: commentText })
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  }

  function handleNameClick() {
  }

  function comments() {
    return commentsResponse.map((commentResponse, idx) => {
      return (
        <div key={idx}>
          <p>{commentResponse.user.name} - {commentResponse.timeAgo}</p>
          <p>{commentResponse.comment.text}</p>
          <div>
            <span className="comment-likes">{0} </span>
            <button className="comment-like-button">{1 == 1 ? "Like" : "Likes"}</button>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="post-container">
      <div className="post-header">
        <img className="avatar" src={postResponse.user.avatar} alt="User Avatar" />
        <div className="post-header-text">
            <Link className="post-author" to={`/profile/${postResponse.user.userName}`}>
              <h2 onClick={handleNameClick} className="username">{postResponse.user.name}</h2>
            </Link>
          <p className="post-date">{postResponse.timeAgo}</p>
        </div>
      </div>
      <div className="post-content">
        <p className="post-text">{postResponse.post.text}</p>
        <img className="post-image" src={postResponse.post.image} alt="Post Image" />
      </div>
      <div className="post-footer">
        <button className="like-button" onClick={handleLikeButtonClick}>{postResponse.likes === 1 ? "Like" : "Likes"} <span className="like-count">{isLiked ? postResponse.likes + 1 : postResponse.likes}</span></button>
        <button className="comment-button" onClick={handleCommentButtonClick}>Comment</button>
      </div>
      {showComments && (
        <div className='comments-container'>
          <div className="post-textarea-container">
            <textarea onChange={(event) => setCommentText(event.target.value)} className="post-textarea" placeholder="Add a comment" />
            <button
              className="post-button"
              onClick={handlePostButtonClick}
            >
              Post
            </button>
          </div>
          {comments()}
        </div>
      )}
    </div>
  );
}

export default SocialMediaPost;