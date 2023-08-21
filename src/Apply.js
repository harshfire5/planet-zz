import ApplyForm from "./ApplyForm";

const Apply = () => {
  return (
    <div className="Apply">
      <div className="pageHeading">Apply for Your Cosmic Adventure</div>
      <div className="applyContent">
        <p>
          Ready to embark on a journey to Planet Zz, the ultimate destination for leisure and exploration?
        </p>
        <p>
          Fill out the application form below to apply for your visit to our extraordinary planet.
        </p>
        <ApplyForm />
      </div>
    </div>
  );
};

export default Apply;