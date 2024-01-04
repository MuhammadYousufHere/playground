import React from 'react';

const PostItem = ({ content }) => {
  return (
    <article style={{ border: '1px solid', padding: '1rem' }}>
      <h2>{content.title}</h2>
      <p>{content.body}</p>
      <span>{content.id}</span>
    </article>
  );
};

export default PostItem;
