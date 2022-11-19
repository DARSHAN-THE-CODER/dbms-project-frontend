import { useState, useEffect } from "react";
// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input";
import FormAction from "../../components/design/FormAction";

import { createStudent } from "../../constants/formFields";
import axios from "axios";

export default function CreateStudent({ classCode }) {
  const fields = createStudent;
  let fieldsState = {};
  fields?.forEach((field) => (fieldsState[field.id] = ""));

  const [createStudentState, setCreateStudentState] = useState(fieldsState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCreateStudentState({
      ...createStudentState,
      [e.target.id]: e.target.value,
    });
  };

  const handleCreateStudent = (e) => {
    e.preventDefault();
    createStudentState.classCode = classCode;
    console.log(createStudentState);
    axios
      .post("http://localhost:6060/student", createStudentState)
      .then((res) => {
        setMessage(res.data.message);
        setError("");
        const myTimeout = setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setMessage("");
        const myTimeout = setTimeout(() => {
          setError("");
        }, 5000);
      });
  };
  return (
    <div className="flex justify-start items-start">
      <div className="flex justify-start items-start flex-col p-3">
        <Header
          heading="Add Student"
          show={false}
          // paragraph="Don't have an account yet? "
          // linkName="Signup"
          // linkUrl="/signup"
        />
        <form className="" onSubmit={handleCreateStudent}>
          <div className="">
            {fields?.map((field) => (
              <Input
                key={field.id}
                handleChange={handleChange}
                value={createStudentState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />
            ))}
          </div>
          <FormAction handleSubmit={handleCreateStudent} text="ADD STUDENT" />
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
