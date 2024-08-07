import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data);
  });

  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
      const response = await PostService.getCommentsByPostId(id)
      setComments(response.data);
  })

  useEffect(()=> {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, [params.id]);

  // useEffect(() => {
  //   const postData = PostService.getById(params.id);
  // }, [])
  return (
    <div>
      <h2>Post {params.id}</h2>
      {(isLoading || !post || isComLoading) ?
        <Loader/> :
        <>
          <div>
            {post?.id}. {post?.title}
          </div>
          <div>
            {comments.map(comm =>
              <div key={comm.id} style={{marginTop: 15}}>
                <h5>{comm.email}</h5>
                <div>{comm.body}</div>
              </div>
            )}
          </div>
        </>
      }
    </div>
  );
};

export default PostIdPage;