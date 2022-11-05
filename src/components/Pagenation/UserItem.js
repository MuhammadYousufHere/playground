import React from 'react';

const UserItem = ({ user }) => {
  return (
    <div>
      <img
        src={user.avatar}
        alt='user'
      />
      <h2>
        Name : {user.first_name} {user.last_name}
      </h2>
      <p>Email : {user.email}</p>
      <p>Role : {user.role}</p>
      <p>USer ID : {user.id}</p>
    </div>
  );
};

export default UserItem;
