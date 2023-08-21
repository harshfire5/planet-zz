import {useLoaderData} from "react-router-dom";

const Aquavities = () => {
  const data = useLoaderData();
  return (
    <div className="Aquavities">
      { data &&
        <>
          <div className="pageHeading">Aqua Escapades</div>
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

export default Aquavities;