import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPostById, deletePost } from '../../axiosAPI';
import { Post } from '../../types.ts';

const PostDetails: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchPostById(id!);
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [id]);

  const handleDelete = async () => {
    await deletePost(id!);
    navigate('/');
  };

  if (loading) {
    return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="container">
      <h1 className="mt-4">{post.title}</h1>
      <p className="text-muted">{new Date(post.date).toLocaleDateString()} at {post.time}</p>
      <div className="mb-4">
        <p>{post.body}</p>
      </div>
      <button
        className="btn btn-danger" onClick={handleDelete}>Delete</button>
      <Link to={`/posts/${id}/edit`} className="btn btn-warning ms-2">Edit</Link>
    </div>
  );
};

export default PostDetails;
