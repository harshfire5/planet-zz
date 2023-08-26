import {Form, Navigate, useActionData} from "react-router-dom";
import {useEffect, useState} from "react";
import Modal from "./Modal";

const ApplyForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const data = useActionData();
  console.log(data);

  useEffect(() => {
    if(data && data.success) {
      setShowModal(true);
      setDisableButton(true);
    }
  }, [data]);

  return (
    <div className="ApplyForm">
      <Modal showModal={showModal} setShowModal={setShowModal} />
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
        <button className="submit" type="submit" disabled={disableButton}>Submit Application</button>
      </Form>
      {data && data.error && <div className="error">{ data.error }</div>}
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
  let success = false;
  let error = null;

  await fetch('http://localhost:8000/apply', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
  }).then(() => {
    console.log("New Application submitted!")
    success = true;
  }).catch(e => {
    console.log(e.message)
    error = e.message
  })

  // if(error) {
  //   return error;
  // }

  return {
    success: success,
    error: error
  };
}