import React from "react";

const User = ({ users }) => {
  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <p key={user.id}>
          {user.name} - Blogs created: {user.blogs.length}
        </p>
      ))}
    </div>
  );
};

export default User;
