const ActivityModalDetails = ({ modalData }) => {
  return (
    modalData.map(activity => (
      <div key={activity.id}>
        <img className="activityImg" src={require("../" + activity.url)} alt={activity.name}/>
        <p className="modalHeading">{activity.name}</p>
        <p>{activity.desc}</p>
      </div>
    ))
  );
};

export default ActivityModalDetails;