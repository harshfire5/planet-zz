import {Form, Navigate, useActionData} from "react-router-dom";

const ApplyForm = () => {
  const error = useActionData();

  return (
    <div className="ApplyForm">
      <Form method="post" action="/apply">
        <p><strong>Personal Information</strong></p>
        <div>
          <label htmlFor="name">Full Name:*</label>
          <input id="name" type="text" name="name" required/>
        </div>
        <div>
          <label htmlFor="email">Contact Email:*</label>
          <input id="email" type="email" name="email" required/>
        </div>
        <button className="submit" type="submit">Submit Application</button>
      </Form>
      {error && <div className="error">{ error }</div>}
    </div>
  );
};

export default ApplyForm;

export const applyAction = async ({ request }) => {
  const formData = await request.formData();
  const jsonData = {
    name: formData.get("name"),
    email: formData.get("email")
  }
  let error = null;

  await fetch('http://localhost:8000/apply', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }).then(() => {
    console.log("New Application submitted!")
  }).catch(e => {
    console.log(e.message)
    error = e.message
  })

  if(error) {
    return error;
  }

  return <Navigate to="/" replace={true}></Navigate>
}