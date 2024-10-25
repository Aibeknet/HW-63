import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../axiosAPI';

interface Post {
  id: string;
  title: string;
  body: string;
  date: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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
                {new Date(post.date).toLocaleDateString()}
              </p>
              <Link to={`/posts/${post.id}`} className="btn btn-info">Read more</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    // <div className="container">
    //   <h1 className="mt-4">Posts</h1>
    //   <Link to="/new-post" className="btn btn-primary mb-3">Add New Post</Link>
    //   <div className="list-group">
    //     {posts.map((post) => (
    //       <div className="list-group-item" key={post.id}>
    //         <h5 className="mb-1">{post.title}</h5>
    //         <p className="mb-1">{post.body}</p>
    //         <p className="card-text text-muted">
    //           {new Date(post.date).toLocaleDateString()}
    //         </p>
    //         <Link to={`/posts/${post.id}`} className="btn btn-link">Read More</Link>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Home;
