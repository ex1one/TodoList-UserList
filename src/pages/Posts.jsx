import React, { useEffect, useState, useRef } from 'react';
import '../styles/app.css';
import PostForm from '../component/UI/PostForm';
import PostFilter from '../component/PostFilter';
import MyModal from '../component/UI/MyModal/MyModal';
import MyButton from '../component/UI/button/Mybutton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import PostList from '../component/PostList';
import Loader from '../component/UI/Loader/Loader';
import useFetching from '../hooks/useFetching';
import getPageCount from '../utils/pages';
import Pagination from '../component/UI/pagination/Pagination';
import useObserver from '../hooks/useObserver';
import MySelect from '../component/UI/select/MySelect';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const responsePosts = await PostService.getAll(limit, page);
    setPosts([...posts, ...responsePosts.data]);
    const totalCount = responsePosts.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const lastElement = useRef();

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts().then();
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (webpage) => { // Шло пересечение если я написал page
    setPage(webpage);
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Количество элементов"
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'Показать все' },
        ]}
      />
      {postError && (
        <h1>
          Произошла ошибка
          {postError}
        </h1>
      )}
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты номер 1" />
      <div ref={lastElement} style={{ height: 10, background: 'red' }} />
      {isPostsLoading
         && <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>}

      <Pagination
        page={page}
        totalPages={totalPages}
        changePage={changePage}
      />
    </div>
  );
};

export default Posts;
