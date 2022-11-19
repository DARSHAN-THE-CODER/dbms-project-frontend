import { useState, useEffect } from "react";
// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input"
import FormAction from "../../components/design/FormAction";

import { createClass, createStudent } from "../../constants/formFields";
import axios from "axios";

import { useNavigate } from "react-router-dom/dist";

export default function CreateClassPage({
    faculty,
}
) {
    const fields = createClass;
    let fieldsState = {};
    fields?.forEach(field => fieldsState[field.id] = '');

    const [createClassState, setCreateClassState] = useState(fieldsState);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setCreateClassState({ ...createClassState, [e.target.id]: e.target.value })
    }

    const handleCreateClass = (e) => {
        e.preventDefault();
        console.log(createClassState)
        createClassState.facultyId = faculty.facultyId;
        console.log(createClassState);
        axios.post(`http://localhost:6060/class`, createClassState)
            .then((res) => {
                console.log(res);
                setError("")
                setMessage(res.data.message);
                const myTimeout = setTimeout(() => {
                    setMessage("");
                    window.location.reload();
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
        <div className="flex justify-start items-start">
            <div className="flex justify-start items-start flex-col p-3">
                <Header
                    heading="Create class"
                    show={false}
                // paragraph="Don't have an account yet? "
                // linkName="Signup"
                // linkUrl="/signup"
                />
                <form className="" onSubmit={handleCreateClass}>
                    <div className="">
                        {fields?.map((field) => (
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={createClassState[field.id]}
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
                    <FormAction handleSubmit={handleCreateClass} text="CREATE CLASS" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-green-500">
                        {message}
                    </h2>
                    {error && <h2 className="mt-6 text-center text-3xl font-extrabold text-red-500">{error}</h2>}
                </form>
            </div>
        </div>
    )
}