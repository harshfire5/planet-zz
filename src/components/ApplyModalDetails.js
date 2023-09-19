import {Link} from "react-router-dom";

const ApplyModalDetails = ({ handleSubmit }) => {
  return (
    <>
      <p>Congratulations! Your application to visit Planet Zz has been successfully submitted.
        Thank you for choosing Planet Zz as your destination for an extraordinary adventure. </p>
      <p>Your application number is: 1234567890.</p>
      <p>We will carefully review your application and get back to you soon with further details.
        In the meantime, please feel free to <Link to="/application-status" target="_blank">check your application status</Link> on the website.</p>
      <p>Safe travels and get ready to embark on a journey like no other!</p>
      <p>- The Planet Zz team</p>
      <button onClick={() => handleSubmit()}>Back to Homepage</button>
    </>
  );
};

export default ApplyModalDetails;