import { useState, useEffect } from "react";
// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input"
import FormAction from "../../components/design/FormAction";

import { createAssignment } from "../../constants/formFields";
import axios from "axios";

import { useNavigate } from "react-router-dom/dist";

export default function CreateAssignment({
    faculty,
    classCode,
}) {
    const fields = createAssignment;
    let fieldsState = {};
    fields?.forEach(field => fieldsState[field.id] = '');

    const [createAssignmentState, setCreateAssignmentState] = useState(fieldsState);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setCreateAssignmentState({ ...createAssignmentState, [e.target.id]: e.target.value })
    }

    const handleCreateAssignment = (e) => {
        e.preventDefault();
        console.log(createAssignmentState)
        console.log(createAssignmentState.deadline.toLocaleString());
        createAssignmentState.facultyId = faculty.facultyId;
        createAssignmentState.classCode = classCode;
        axios.post("http://localhost:6060/assignments", createAssignmentState)
            .then(res => {
                setMessage(res.data.message);
                setError("");
                const myTimeout = setTimeout(() => {
                    setMessage("");
                }, 5000);
                setCreateAssignmentState(fieldsState);
            })
            .catch(err => {
                setMessage("");
                setError(err.response.data.message);
                const myTimeout = setTimeout(() => {
                    setError("");
                }, 5000);
            })
    }
    return (
        <div className="flex justify-start items-start">
            <div className="flex justify-start items-start flex-col p-3">
                <Header
                    heading="Create Assignment"
                    show={false}
                // paragraph="Don't have an account yet? "
                // linkName="Signup"
                // linkUrl="/signup"
                />
                <form className="" onSubmit={handleCreateAssignment}>
                    <div className="">
                        {fields?.map((field) => (
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={createAssignmentState[field.id]}
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
                    <FormAction handleSubmit={createAssignmentState} text="CREATE ASSIGNMENT" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-green-500">
                        {message}
                    </h2>
                    {error && <h2 className="mt-6 text-center text-3xl font-extrabold text-red-500">{error}</h2>}
                </form>
            </div>
        </div>
    )
}