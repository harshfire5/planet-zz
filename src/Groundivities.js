import {useLoaderData} from "react-router-dom";

const Groundivities = () => {
  const [data, error] = useLoaderData();
  return (
    <div className="Groundivities">
      { error && <div className="error"></div> }
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