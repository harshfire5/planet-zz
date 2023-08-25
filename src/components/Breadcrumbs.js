import React from 'react';
import {Link} from "react-router-dom";

const Breadcrumbs = ({location}) => {
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