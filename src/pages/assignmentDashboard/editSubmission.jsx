import { useState, useEffect } from "react";

// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input"
import FormAction from "../../components/design/FormAction";
import Modal from "../../components/design/Modal";
import { editSubmission } from "../../constants/formFields";

import axios from "axios";
import { Link } from "react-router-dom";

export default function EditSubmission({
    submission,
    // assignmentHeaders,
}) {
    // console.log(assignmentHeaders)
    // console.log(assignment)

    const fields = editSubmission;
    let fieldsState = {};
    fields?.forEach(field => fieldsState[field.id] = '');

    const [submissionDetails, setSubmissionDetails] = useState(submission);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        setSubmissionDetails({ ...submissionDetails, [e.target.id]: e.target.value })
    }

    const handleEditSubmission = (e) => {
        e.preventDefault();
        console.log(submissionDetails);
        axios.patch(`http://localhost:6060/submission//${submissionDetails?.assignmentId}/${submissionDetails?.srn}`,submissionDetails )
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
    console.log(submissionDetails?.createdAt)
    function convDate(date) {
        let d = new Date(date);
        return d.toDateString();
    }

    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="flex justify-start items-start flex-col p-3">
                {/* <button 
                    onClick={() => deleteSubmission()}
                className="bg-slate-400 rounded-sm p-1">
                    DELETE
                </button> */}
                <Header
                    heading=""
                    show={false}
                />
                <h3>
                    SUBMITTED ON : 
                </h3>
                <h4 className="font-semibold">
                {convDate(submissionDetails?.createdAt)} 
                </h4>
                <hr className="w-full h-2"></hr>
                <form className="" onSubmit={handleEditSubmission}>
                    <div >
                        {fields?.map((field, index) => (
                            <div key={index} className="flex font-bold flex-col">
                                <h3 className="">{field.labelText} :</h3>
                                <Input
                                    key={field.id}
                                    handleChange={handleChange}
                                    value={submissionDetails[field.id]}
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
                    <FormAction handleSubmit={handleEditSubmission} text="UPDATE SUBMISSION" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-green-500">
                        {message}
                    </h2>
                    {error && <h2 className="mt-6 text-center text-3xl font-extrabold text-red-500">{error}</h2>}
                </form>
                <div
                onClick={() => setShowModal(true)}
                className="bg-slate-400 text-conter justify-center cursor-pointer p-2">SHOW RESPONSE</div>
                </div>
            {
                showModal && <Modal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    src={submissionDetails?.response}
                />
            }
            {/* </Link> */}
        </div>
    )
}