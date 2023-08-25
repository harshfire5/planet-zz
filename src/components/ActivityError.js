import {Link} from "react-router-dom";
import React from "react";

const ActivityError = () => {
  return (
    <div className="ActivityError Notfound">
      <div className="pageHeading">Activity Not Found</div>
      <div className="content">
        <p>Sorry, no such activity exists!</p>
        <p>Go back to <Link to="/activities">Acitivities</Link>.</p>
      </div>
    </div>
  );
};

export default ActivityError;