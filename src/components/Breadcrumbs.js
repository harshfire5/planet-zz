import React from 'react';
import {Link, useLocation} from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  let currentPath = "";
  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentPath += `/${crumb}`;
      return (
        <div className="crumb" key={crumb}>
          <Link to={currentPath}>{crumb}</Link>
        </div>
      )
    })
  return (
    <div className="Breadcrumbs">
      {crumbs}
    </div>
  );
};

export default Breadcrumbs;