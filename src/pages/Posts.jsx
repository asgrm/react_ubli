import React, { useEffect, useRef, useState } from 'react';
import { getPageCount } from '../utils/pages'
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';
import MyInput from '../components/UI/input/MyInput';


function Posts() {
  const [posts , setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const  [fetchPosts, isPostsLoading, postError] = useFetching(async(limit, page) => {
    const res = await PostService.getAll(limit, page);
    setPosts([...posts, ...res.data]);
    const totalCount = +res.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });
  useObserver(
    lastElement,
    page < totalPages,
    isPostsLoading,
    ()=> {
      setPage(page + 1);
  })


  useEffect(()=> {
    fetchPosts(limit, page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit])

  const changePage = (page) => {
    setPage(page);
  };

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>Create post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <MySelect value={limit} defaultValue={'elements on page'} options={[
        {value: 5, name: '5'},
        {value: 10, name: '10'},
        {value: 25, name: '25'},
        {value: -1, name: 'all posts'},
      ]} onChange={(e) => setLimit(e)}/>

      {postError && <h2>Error happened {postError}</h2>}
      {
        isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
          <Loader/>
        </div>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'List of posts'}/>

      <div ref={lastElement} style={{height: 20, background: 'red'}} />
      <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
      <div className="page__wrapper">
      </div>
    </div>
  );
}


export default Posts;
