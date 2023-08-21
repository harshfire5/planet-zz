import {useLoaderData} from "react-router-dom";

const Groundivities = () => {
  const data = useLoaderData();
  return (
    <div className="Groundivities">
      { data &&
        <>
          <div className="pageHeading">Land Lifestyles</div>
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

export default Groundivities;