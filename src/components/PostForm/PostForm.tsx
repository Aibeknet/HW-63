import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPostById, createPost, updatePost } from '../../axiosAPI';

const PostForm: React.FC<{ isEdit: boolean }> = ({ isEdit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      const getPost = async () => {
        const data = await fetchPostById(id!);
        setTitle(data.title);
        setBody(data.body);
      };
      getPost();
    }
  }, [isEdit, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postData: { date: string; title: string; body: string } = { title, body, date: new Date().toISOString() };

    if (isEdit) {
      await updatePost(id!, postData);
    } else {
      await createPost(postData);
    }
    navigate('/');
  };

  return (
    <div className="container">
      <h1 className="mt-4">{isEdit ? 'Edit Post' : 'Add New Post'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Description"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {isEdit ? 'Edit' : 'Create'} Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
