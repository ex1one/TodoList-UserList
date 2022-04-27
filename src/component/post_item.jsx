import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from './UI/button/Mybutton';

const PostItem = (props) => {
  const { remove, post, number } = props;
  const router = useNavigate();

  const postPage = () => {
    router(`/posts/${post.id}`);
  };

  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {post.id}
          .
          {post.title}
        </strong>
        <div>
          {post.body}
        </div>
      </div>
      <div className="post__btns">
        <MyButton onClick={postPage}>Открыть</MyButton>
        <MyButton onClick={() => remove(post)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
