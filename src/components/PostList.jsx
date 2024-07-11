import React from 'react';
import PostItem from './PostItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const PostList = ({posts, title, remove}) => {
  if (posts.length === 0) {
    return (
      <h2 style={{textAlign: 'center'}}>
        There is no posts yet
      </h2>
    );
  }
  return (
    <div>
      <h1 style= {{textAlign: 'center'}}>{title}</h1>
      <TransitionGroup>
        {posts.map((post,idx) =>
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="post"
          >
            <PostItem remove={remove} number={post.id} post={{id: post.id, title: post.title, body: post.body}}/>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default PostList;