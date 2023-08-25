const Activity = ({ name, data }) => {
  return (
    <div className="Activity">
      <div className="pageHeading">{ name }</div>
      <div className="content">
        <ul>
          {data.map(activity => {
              return (
                <li key={activity.id}>
                  <p>
                    <strong>{activity.name}: </strong>
                    {activity.desc}
                  </p>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  );
};

export default Activity;