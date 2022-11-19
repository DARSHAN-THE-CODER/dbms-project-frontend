import { useState, useEffect } from "react";

// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input";
import FormAction from "../../components/design/FormAction";

import { signupFields } from "../../constants/formFields";

import axios from "axios";

export default function UpdateFaculty({ faculty }) {
    console.log(faculty)
  const fields = signupFields;
  let fieldsState = {};
  fields?.forEach((field) => (fieldsState[field.id] = ""));

  const [facultyState, setFacultyState] = useState(faculty);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFacultyState({
      ...facultyState,
      [e.target.id]: e.target.value,
    });
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();
    console.log("facultyState ",facultyState);
    axios
      .patch(`http://localhost:6060/faculty/${facultyState.srn}`, facultyState)
      .then((res) => {
        console.log(res);
        setMessage("Faculty updated successfully");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setError("Error updating faculty");
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <div class="max-w-sm p-2 rounded-sm overflow-hidden shadow-lg">
      <div className="flex justify-start items-start flex-col p-3">
        <Header heading="Edit Profile" show={false} />
        <form className="" onSubmit={handleUpdateStudent}>
          <div>
            {fields?.map((field, index) => (
              <div key={index} className="flex font-bold flex-col">
                <h3 className="">{field.labelText} :</h3>
                <Input
                  key={field.id}
                  handleChange={handleChange}
                  value={facultyState[field.id]}
                  labelText={field.labelText}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  isRequired={field.isRequired}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
          <FormAction
            handleSubmit={handleUpdateStudent}
            text="UPDATE FACULTY"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-green-500">
            {message}
          </h2>
          {error && (
            <h2 className="mt-6 text-center text-3xl font-extrabold text-red-500">
              {error}
            </h2>
          )}
        </form>
      </div>
    </div>
  );
}
