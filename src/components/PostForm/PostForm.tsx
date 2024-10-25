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
    if (isEdit) {
      await updatePost(id!, { title, body });
    } else {
      await createPost({ title, body });
    }
    navigate('/');
  };

  return (
    <div className="container">
      <h1 className="mt-4">{isEdit ? 'Edit Post' : 'Add New Post'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Body</label>
          <textarea className="form-control" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" required />
        </div>
        <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'} Post</button>
      </form>
    </div>
  );
};

export default PostForm;
