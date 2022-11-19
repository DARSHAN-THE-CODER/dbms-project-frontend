import { useState, useEffect } from "react";
// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input";
import FormAction from "../../components/design/FormAction";

import { limitedStudentsForm } from "../../constants/formFields";
import axios from "axios";

export default function GetLimitedStudents({ classCode }) {
  const fields = limitedStudentsForm;
  let fieldsState = {};
  fields?.forEach((field) => (fieldsState[field.id] = ""));

  const [createStudentState, setCreateStudentState] = useState(fieldsState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [studentRecords, setStudentRecords] = useState([]);

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
      .get(
        `http://localhost:6060/student/class/limit/${classCode}/${createStudentState?.limit}/${createStudentState?.offset}`
      )
      .then((res) => {
        console.log(res.data);
        setStudentRecords(res.data[0]?.Students);
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
  console.log(studentRecords);
  return (
    <div className="flex flex-row justify-center items-center mx-auto w-full">
      <div className="flex justify-center items-center flex-col p-3">
        <Header
          //   heading="Add Student"
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
          <FormAction handleSubmit={handleCreateStudent} text="GET RECORDS" />
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

      <div className="flex flex-col p-3 justify-center items-center mx-auto w-full">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                    >
                      SRN
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                    >
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentRecords?.map((student, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {student.srn}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {student.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
