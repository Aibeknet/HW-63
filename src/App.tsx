import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contacts from './components/Contacts/Contacts.tsx';
import Home from './components/Home/Home.tsx';
import Navbar from './components/NavBar/NavBar.tsx';
import About from './components/About/About.tsx';
import AddPost from './components/PostForm/AddPost/AddPost.tsx';
import EditPost from './components/PostForm/EditPost/EditPost.tsx';
import PostDetails from './components/PostDetails/PostDetails.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/new-post" element={<AddPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
      </Routes>
    </Router>
  );
};

export default App;

