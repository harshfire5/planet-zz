import {useLoaderData} from "react-router-dom";

const AerialActivities = () => {
  const [data, error] = useLoaderData();
  return (
    <div className="AerialActivities">
      { error && <div className="error"></div> }
      { data &&
        <>
          <div className="pageHeading">Aerial Adventures</div>
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
        </>
      }
    </div>
  );
};

export default AerialActivities;