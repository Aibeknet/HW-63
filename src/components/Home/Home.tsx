import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../axiosAPI';
import { Post } from '../../types.ts';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      const loadedPosts = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
      setPosts(loadedPosts);
      setLoading(false);
    };

    getPosts();
  }, []);

  if (loading) {
    return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Posts list</h1>
      <Link to="/new-post" className="btn btn-primary mb-3">Add the new post</Link>
      <div className="mb-3">
        {posts.map(post => (
          <div className="card mb-3" key={post.id}>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body}</p>
              <p className="card-text text-muted">
                {new Date(post.date).toLocaleDateString()} at {post.time}
              </p>
              <Link to={`/posts/${post.id}`} className="btn btn-info">Read more</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
