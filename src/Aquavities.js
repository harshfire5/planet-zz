import {useLoaderData} from "react-router-dom";

const Aquavities = () => {
  const [data, error] = useLoaderData();
  return (
    <div className="Aquavities">
      { error && <div className="error">{ error }</div> }
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