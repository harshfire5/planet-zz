import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
  return (
    <div className="Notfound">
      <div className="pageHeading">Page Not Found!</div>
      <div className="content">
        <p>The page you are looking for is not available.</p>
        <p>Go back to <Link to="/">Homepage</Link>.</p>
      </div>
    </div>
  );
};

export default NotFound;