import React from 'react';
import PostItem from './PostItem';
import Button from '../Button/Button';
import { getPostPage } from '../Api/axios';
const Pagenation = () => {
  const [page, setPage] = React.useState(1);
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    getPostPage(page).then((data) => setPosts(data));
  }, [page]);
  const content = posts.map((post) => (
    <PostItem
      key={post.id}
      content={post}
    />
  ));
  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);
  return (
    <>
      <nav>
        <button
          onClick={prevPage}
          title='Prev'
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          onClick={nextPage}
          title='Next'
          disabled={!posts.length}
        >
          Next
        </button>
        {content}
      </nav>
    </>
  );
};

export default Pagenation;
