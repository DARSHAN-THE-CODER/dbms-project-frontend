import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input"
import FormAction from "../../components/design/FormAction";

import { createClass, createStudent, createAssignment } from "../../constants/formFields";
import CreateAssignment from "../createAssignment";
import CreateStudent from "../createStudent";
import ShowAssignments from "../assignments";
import ShowStudents from "../createStudent/updateStudent";
import GetLimitedStudents from "../createStudent/getLimitedStudents";

export default function ClassPage(
) {
    const navigate = useNavigate();
    const fields = createClass;
    let fieldsState = {};
    fields?.forEach(field => fieldsState[field.id] = '');

    const { id } = useParams()
    const [students, setStudents] = useState([])
    const [assignments, setAssignments] = useState([]);
    const [classDetails, setClassDetails] = useState({});
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [assignmentHeaders, setAssignmentHeaders] = useState([]);
    const [limitedStudents, setLimitedStudents] = useState([]);

    const [faculty, setFaculty] = useState(
        JSON.parse(localStorage.getItem("faculty"))
    );

    const handleChange = (e) => {
        setClassDetails({ ...classDetails, [e.target.id]: e.target.value })
    }

    const handleEditClass = (e) => {
        e.preventDefault();
        console.log(classDetails)
        axios.patch(`http://localhost:6060/class/${classDetails?.classCode}`, classDetails)
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
    useEffect(() => {
        axios.get(`http://localhost:6060/class/${id}`)
            .then((res) => {
                console.log(res.data?.Classes[0]?.Students)
                setStudents(res.data?.Classes[0]?.Students)
            })
            .catch((err) => {
                console.log(err)
            })

        // to get assignments
        axios.get(`http://localhost:6060/assignments/class/${id}`)
            .then((res) => {
                console.log(res.data[0])
                setClassDetails(res.data[0])
                setClassDetails(current => {
                    const { Assignments, ...rest } = current;
                    return rest;
                })
                console.log(res.data[0]?.Assignments)
                setAssignments(res.data[0]?.Assignments)
                if (res.data[0]?.Assignments?.length > 0) {
                    setAssignmentHeaders(Object.keys(res.data[0]?.Assignments[0]))
                    // remove assignmentId, facultyId, classCode, facultyId, type 
                    setAssignmentHeaders(current => {
                        const { assignmentId, facultyId, classCode, type, ...rest } = current;
                        return rest;
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])
    // console.log(classDetails)
    // console.log(assignments)
    // console.log(assignmentHeaders)
    console.log(students)

    function deleteAssignment(assignment) {
        console.log(assignment)
        // setAssignments(current => {
        //     return current.filter((item) => item.assignmentId !== assignment.assignmentId)
        // })
        axios.delete(`http://localhost:6060/assignments/${assignment.assignmentId}`)
            .then((res) => {
                console.log(res)
                setAssignments(current => {
                    return current.filter((item) => item.assignmentId !== assignment.assignmentId)
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function deleteStudent(student) {
        console.log(student)
        axios.delete(`http://localhost:6060/student/${student.srn}/${student.classCode}`)
            .then((res) => {
                console.log(res)
                setStudents(current => {
                    return current.filter((item) => item.srn !== student.srn)
                })
            }
            )
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="w-full bg-slate-400">
            <div className="flex">
                <h2 className="text-center mx-auto my-auto text-3xl font-extrabold text-gray-900">
                    WELCOME {faculty?.firstName}
                </h2>
                <button onClick={() => {navigate('/dashboard') }} className="bg-slate-600 text-white p-2 rounded-lg flex-end  items-end justify-end">
                    BACK
                </button>
            </div>
            <hr className="w-full"></hr>
            <div className="flex">
                <div className="flex justify-start bg-white rounded-lg m-3 items-start flex-col p-3">
                    <Header
                        heading="Update class"
                        show={false}
                    />
                    <form className="" onSubmit={handleEditClass}>
                        <div >
                            {fields?.map((field, index) => (
                                <div key={index} className="flex font-bold flex-col">
                                    <h3 className="">{field.labelText} :</h3>
                                    <Input
                                        key={field.id}
                                        handleChange={handleChange}
                                        value={classDetails[field.id]}
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
                        <FormAction handleSubmit={handleEditClass} text="UPDATE CLASS" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-green-500">
                            {message}
                        </h2>
                        {error && <h2 className="mt-6 text-center text-3xl font-extrabold text-red-500">{error}</h2>}
                    </form>
                </div>
                <div className="border-2 rounded-lg m-3 bg-white">
                    <CreateAssignment classCode={classDetails?.classCode} faculty={faculty} />
                </div>
                <div className="border-2 rounded-lg m-3 bg-white">
                    <CreateStudent classCode={classDetails?.classCode} />
                </div>
            </div>
            <hr className="w-full h-2"></hr>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
                ASSIGNMENTS
            </h2>
            <hr className="w-full h-2"></hr>
            <div className="flex flex-wrap">
                {
                    assignments?.length > 0 ?
                        (
                            assignments?.map((assignment, index) => (
                                <div key={index} className="border-2 rounded-lg m-3 bg-white">
                                    <div className="flex flex-col">
                                        <button
                                            onClick={() => deleteAssignment(assignment)}
                                            className="bg-slate-400 rounded-sm p-1"
                                        >
                                            DELETE
                                        </button>
                                        <ShowAssignments key={index} assignment={assignment} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h2 className="text-center text-3xl font-extrabold text-gray-900">
                                NO ASSIGNMENTS FOUND
                            </h2>
                        )
                }
            </div>
            <hr className="w-full h-2"></hr>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Students
            </h2>
            <hr className="w-full h-2"></hr>
            <div className="flex overflow-x-auto">
                {
                    students?.length > 0 ?
                        (
                            students?.map((student, index) => (
                                <div key={index} className="border-2 rounded-lg m-3 bg-white">
                                    <div className="flex flex-col">
                                        <button
                                            onClick={() => deleteStudent(student)}
                                            className="bg-slate-400 rounded-sm p-1"
                                        >
                                            DELETE
                                        </button>
                                        <ShowStudents key={index} student={student} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h2 className="text-center text-3xl font-extrabold text-gray-900">
                                NO STUDENTS FOUND
                            </h2>
                        )
                }
            </div>
            <hr className="w-full h-2"></hr>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Get Specific number of students
            </h2>
            <hr className="w-full h-2"></hr>
            <GetLimitedStudents classCode={classDetails?.classCode} />
        </div>
    );
}
