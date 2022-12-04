import React, { useState, useEffect } from 'react';

//get locale from browser all browsers supported
const locale = window.navigator.language.split(/[-_]/)[0];




const Playground = () => {
  console.log(locale);

  const [data, setData] = useState([]);
  useEffect(() => {
    (async function () {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();
      setData(data);
    })();
  }, []);
  const filterUser = (id) => {
    setData(data.filter((user) => user.id !== id));
  };
  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <h1>{item.name}</h1>
          <p>{item.username}</p>
          <button onClick={() => filterUser(item.id)}>Remove</button>
        </div>
      ))}
    </>
  );
};
export default Playground;
