import React from "react";
import { Jumbotron, Button } from "react-bootstrap";

const JumbotronComponent = (props) => {
  return (
    <div>
      <Jumbotron>
        <h1>Hello, World</h1>

        {/* <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information
        </p> */}

        <p>{props.children}</p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default JumbotronComponent;
