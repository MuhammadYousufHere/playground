import React from 'react';
import UserItem from './UserItem';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { getUserPage } from '../Api/axios';
const PagenationQ = () => {
  const [page, setPage] = React.useState(1);

  const {
    isLoading,
    isError,
    data: users,
    isFetching,
    isPreviousData,
  } = useQuery(['users', page], () => getUserPage(page), {
    keepPreviousData: true,
  });
  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  if (isLoading) return <h3>Loading Users...</h3>;
  if (isError) return <h3>Error : {isError.message}</h3>;
  const content = users?.data.map((user) => (
    <UserItem
      key={user.id}
      user={user}
    />
  ));
  const pagesArray = Array(users.total_pages)
    .fill()
    .map((_, i) => i + 1);
  return (
    <nav>
      <button
        onClick={prevPage}
        title='Prev'
        disabled={isPreviousData || page === 1}
      >
        Prev
      </button>
      {pagesArray.map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
        >
          Page {page}
        </button>
      ))}
      <button
        onClick={nextPage}
        title='Next'
        disabled={isPreviousData || page === users.total_pages}
      >
        Next
      </button>
      {isFetching && <p>loading...</p>}
      {content}
    </nav>
  );
};

export default PagenationQ;
