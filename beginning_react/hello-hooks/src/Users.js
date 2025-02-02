import React from "react";
import useFetch from "./useFetch";

const Users = () => {
  const users = useFetch("https://jsonplaceholder.typicode.com/users");

  return (
    <div>
      <ul>
        {users.map((el) => (
          <li key={el.id}>{el.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
