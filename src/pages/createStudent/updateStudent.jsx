import { useState, useEffect } from "react";

// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input";
import FormAction from "../../components/design/FormAction";

import {
  createClass,
  createStudent,
  createAssignment,
} from "../../constants/formFields";

import axios from "axios";

export default function UpdateStudent({ student }) {
  const fields = createStudent;
  let fieldsState = {};
  fields?.forEach((field) => (fieldsState[field.id] = ""));

  const [studentState, setStudentState] = useState(student);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setStudentState({
      ...studentState,
      [e.target.id]: e.target.value,
    });
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();
    console.log(studentState);
    axios
      .patch(`http://localhost:6060/student/${studentState.srn}/${studentState?.classCode}`, studentState)
      .then((res) => {
        console.log(res);
        setMessage("Student updated successfully");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setError("Error updating student");
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="flex justify-start items-start flex-col p-3">
        <Header heading="" show={false} />
        <form className="" onSubmit={handleUpdateStudent}>
          <div>
            {fields?.map((field, index) => (
              <div key={index} className="flex font-bold flex-col">
                <h3 className="">{field.labelText} :</h3>
                <Input
                  key={field.id}
                  handleChange={handleChange}
                  value={studentState[field.id]}
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
            text="UPDATE STUDENT"
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
