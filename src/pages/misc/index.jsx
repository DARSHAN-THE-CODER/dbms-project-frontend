import React,{ useState, useEffect } from "react";
// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input"
import FormAction from "../../components/design/FormAction";

import { inersectionForm } from "../../constants/formFields";
import axios from "axios";

import { useNavigate } from "react-router-dom/dist";

export default function Misc() 
{

    const fields = inersectionForm;
    let fieldsState = {};
    fields?.forEach(field => fieldsState[field.id] = '');

    const [getStudents, setGetStudents] = useState(fieldsState)
    const [commonStudents, setCommonStudents] = useState([])
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setGetStudents({ ...getStudents, [e.target.id]: e.target.value })
    }

    const handleFetch = (e) => {
        e.preventDefault()
        console.log(getStudents)
        axios.get(`http://localhost:6060/special/intersect/${getStudents.classCode1}/${getStudents.classCode2}`)
        .then((res) => {
            console.log(res.data)
            setCommonStudents(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
        <div className="flex justify-start items-start">
            <div className="flex justify-start items-start flex-col p-3">
                <Header
                    heading="ENTER CLASS CODE"
                    show={false}
                // paragraph="Don't have an account yet? "
                // linkName="Signup"
                // linkUrl="/signup"
                />
                <form className="" onSubmit={handleFetch}>
                    <div className="">
                        {fields?.map((field) => (
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={getStudents[field.id]}
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
                    <FormAction handleSubmit={handleFetch} text="GET COMMON STUDENT LIST" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-green-500">
                        {message}
                    </h2>
                    {error && <h2 className="mt-6 text-center text-3xl font-extrabold text-red-500">{error}</h2>}
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {commonStudents && commonStudents?.map((student, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {student.srn}
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
        </div>
    )
}