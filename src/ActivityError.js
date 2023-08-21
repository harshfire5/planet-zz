import {useRouteError} from "react-router-dom";

const ActivityError = () => {
  const error = useRouteError()
  return (
    <div className="ActivityError">
      <div className="pageHeading">Error: Not Found</div>
      <div className="content">{ error.message }</div>
    </div>
  );
};

export default ActivityError;