import React from "react";
import Products from "./Products";

function formatName(user) {
  return user.firstName + " " + user.lastName;
}

const App = () => {
  const user = {
    firstName: "Luvuyo",
    lastName: "Mazibuko",
    imageUrl: "https://picsum.photos/600/300",
  };

  return (
    <div>
      {/* example 1 & 3: */}
      <Products />

      {/* example 2: */}
      {/* <h1>
        Hello, {formatName(user)}
        <br />
        <img src={user.imageUrl} />
      </h1> */}
    </div>
  );
};

export default App;
