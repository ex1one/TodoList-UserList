import React, { useState } from 'react';
import MyInput from './input/MyInput';
import Mybutton from './button/Mybutton';

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: '', body: '' });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post, id: Date.now(),
    };
    create(newPost);
    setPost({ title: '', body: '' });
  };

  return (
    <form>
      {/* Управляемый компонент */}
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Название"
      />
      {/* Неуправляемый компонент */}
      <MyInput
                // ref={bodyInputRef}
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Описание"
      />
      <Mybutton onClick={addNewPost}>Создать пост</Mybutton>
    </form>
  );
};

export default PostForm;
