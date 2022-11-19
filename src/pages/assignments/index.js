import { useState, useEffect } from "react";

// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input"
import FormAction from "../../components/design/FormAction";

import { createClass, createStudent, createAssignment } from "../../constants/formFields";

import axios from "axios";
import { Link } from "react-router-dom";

export default function ShowAssignments({
    assignment,
    // assignmentHeaders,
}) {
    // console.log(assignmentHeaders)
    // console.log(assignment)

    const fields = createAssignment;
    let fieldsState = {};
    fields?.forEach(field => fieldsState[field.id] = '');

    const [assignmentDetails, setAssignmentDetails] = useState(assignment);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setAssignmentDetails({ ...assignmentDetails, [e.target.id]: e.target.value })
    }

    const handleEditAssignment = (e) => {
        e.preventDefault();
        console.log(assignmentDetails)
        axios.patch(`http://localhost:6060/assignment/${assignmentDetails?.assignmentId}`, assignmentDetails)
            .then((res) => {
                console.log(res);
                setError("")
                setMessage(res.data.message);
                const myTimeout = setTimeout(() => {
                    setMessage("");
                }, 5000);
                // navigate('/dashboard');
            })
            .catch((err) => {
                console.log(err);
                setMessage("")
                setError(err.response.data.message);
                const myTimeout = setTimeout(() => {
                    setError("");
                }, 5000);
            })
    }
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg">

            <div className="flex justify-start items-start flex-col p-3">
                <Link className="text-blue-500" to={`/assignment/${assignment?.assignmentId}`}> VIEW ASSIGNMENT >>>>> </Link>
                <Header
                    heading=""
                    show={false}
                />
                <form className="" onSubmit={handleEditAssignment}>
                    <div >
                        {fields?.map((field, index) => (
                            <div key={index} className="flex font-bold flex-col">
                                <h3 className="">{field.labelText} :</h3>
                                <Input
                                    key={field.id}
                                    handleChange={handleChange}
                                    value={assignmentDetails[field.id]}
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
                    <FormAction handleSubmit={handleEditAssignment} text="UPDATE ASSIGNMENT" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-green-500">
                        {message}
                    </h2>
                    {error && <h2 className="mt-6 text-center text-3xl font-extrabold text-red-500">{error}</h2>}
                </form>
            </div>
            {/* </Link> */}
        </div>
    )
}