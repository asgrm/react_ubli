import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
    <MyInput type='text'  placeholder= "Search..." value={filter.query} onChange={(e) => setFilter( {...filter, query: e.target.value })}/>
    <MySelect
      value={filter.sort}
      // select component returns value when 'change' is fired
      onChange={(sort) => setFilter({...filter, sort })}
      defaultValue="Order by"
      options = {[
        {value: 'title', name: 'By title'},
        {value: 'body', name: 'By description'}
      ]}
    />
  </div>
  );
};

export default PostFilter;