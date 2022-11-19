import { useState } from "react";
// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input";
import FormAction from "../../components/design/FormAction";

import { studentForm1, submissionResponse, disabledAssignmentFields } from "../../constants/formFields";

import ShowAssignments from "../assignments";
import Modal from "../../components/design/Modal";

import axios from "axios";

export default function StudentForm1() {
  const fields = studentForm1;
  let fieldsState = {};
  fields?.forEach((field) => (fieldsState[field.id] = ""));

  const fields2 = disabledAssignmentFields;
  let fieldsState2 = {};
  fields2?.forEach((field) => (fieldsState2[field.id] = ""));

  const fields3 = submissionResponse;
  let fieldsState3 = {};
  fields3?.forEach((field) => (fieldsState3[field.id] = ""));

  // setForm1(fieldsState)
  const [form1, setForm1] = useState(fieldsState);
  const [assignments, setAssignments] = useState(fieldsState2);
  const [choosenAssignment, setChoosenAssignment] = useState({})
  const [response, setResponse] = useState(fieldsState3)

  const [showModal, setShowModal] = useState(false)

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm1({ ...form1, [e.target.id]: e.target.value });
  };

  const handleResponseChange = (e) => {
    setResponse({ ...response, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form1);
    axios.get(`http://localhost:6060/assignments/class/${form1?.classCode}`).then((res) => {
      console.log(res.data[0]?.Assignments || [])
      setAssignments(res.data[0]?.Assignments)
    })
      .catch((err) => {
        console.log(err)
      })
  };

  const handleClick = (assignment) => {
    console.log("i am clicked ", assignment)
    setChoosenAssignment(assignment)
  }

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    console.log(response)
    // let x = { ...choosenAssignment }
    // let y = { ...form1 }
    // let z = {...response}
    // console.log(z)
    // setResponse((prev) => ({ ...prev, srn: form1?.srn, assignmentId: choosenAssignment?.assignmentId }))
    // console.log("form 1 is ",form1)
    // console.log("choosen ASSignmeny is ",choosenAssignment)
    // console.log(response)
    axios.post("http://localhost:6060/submission",{ 
      ...response,
      srn: form1?.srn, 
      assignmentId: choosenAssignment?.assignmentId
    })
      .then((res) => {
        console.log(res.data)
        setAssignments(fieldsState2)
        setForm1(fieldsState)
        setResponse(fieldsState3)
        setChoosenAssignment({})
        setShowModal(true)
        setMessage(res.data?.message)
        setTimeout(() => {
          setMessage("")
          setError("")
          setShowModal(false)
        }, 3000);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message)
        setAssignments(fieldsState2)
        setForm1(fieldsState)
        setResponse(fieldsState3)
        setChoosenAssignment({})
        setShowModal(true)
        setError(err?.response?.data?.message)
        setTimeout(() => {
          setMessage("")
          setError("")
          setShowModal(false)
        }, 3000);
      })
  }
  // console.log(response)
  return (
    <div className="w-full">
      <div className="mx-auto w-full font-semibold text-center text-3xl">SUBMIT ASSIGNMENT</div>
      <div className="flex mx-auto flex-wrap mt-10">
        <div className="flex flex-col p-2 m-3 border-rounded-sm border-2">
          <Header
            heading="ENTER DETAILS"
            // paragraph="Already have an account? "
            // linkName="Login"
            // linkUrl="/"
            show={false}
          />
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
              {fields?.map((field) => (
                <Input
                  key={field.id}
                  handleChange={handleChange}
                  value={form1[field.id]}
                  labelText={field.labelText}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  isRequired={true}
                  placeholder={field.placeholder}
                />
              ))}
            </div>
            <FormAction handleSubmit={handleSubmit} text="NEXT" />
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
        {
          choosenAssignment?.assignmentId && (
            <div className="flex flex-col m-3 p-2 border-rounded-sm border-2">
              {/* <h2 className="text-center text-2xl font-extrabold text-gray-900">
              SUBMIT RESPONSE
            </h2> */}
              <Header
                heading="PLEASE ENTER LINK"
                // paragraph="Already have an account? "
                // linkName="Login"
                // linkUrl="/"
                show={false}
              />
              <form className="mt-8 space-y-6" onSubmit={handleFinalSubmit}>
                <div className="-space-y-px">
                  {fields3?.map((field) => (
                    <Input
                      key={field.id}
                      handleChange={handleResponseChange}
                      value={response[field.id]}
                      labelText={field.labelText}
                      labelFor={field.labelFor}
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      isRequired={true}
                      placeholder={field.placeholder}
                    />
                  ))}
                </div>
                <FormAction handleSubmit={handleFinalSubmit} text="SUBMIT" />
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
          )
        }
      </div>
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        CHOOSE ASSIGNMENT
      </h2>
      <div className="flex flex-wrap">
        {
          assignments?.length > 0 ?
            (
              assignments?.map((assignment, index) => (
                <div key={index}
                  onClick={() => handleClick(assignment)}
                  className={`border-2 rounded-lg m-3 bg-white cursor-pointer ${choosenAssignment?.assignmentId === assignment?.assignmentId ? "bg-slate-400" : ""}`}>
                  <div className="flex flex-col">
                    <div class="max-w-sm rounded overflow-hidden shadow-lg">

                      <div className="flex justify-start items-start flex-col p-3">
                        {/* <Link className="text-blue-500" to={`/assignment/${assignment?.assignmentId}`}> VIEW ASSIGNMENT >>>>> </Link> */}
                        <Header
                          heading=""
                          show={false}
                        />
                        <form className="">
                          <div >
                            {fields2?.map((field, index) => (
                              <div key={index} className="flex font-bold flex-col">
                                <h3 className="">{field.labelText} :</h3>
                                <Input
                                  key={field.id}
                                  // handleChange={handleAssignmentChange}
                                  value={assignment[field.id]}
                                  labelText={field.labelText}
                                  labelFor={field.labelFor}
                                  id={field.id}
                                  name={field.name}
                                  type={field.type}
                                  disabled={field.disabled}
                                  isRequired={field.isRequired}
                                  placeholder={field.placeholder}
                                />
                              </div>
                            ))}
                          </div>
                        </form>
                      </div>
                      {/* </Link> */}
                    </div>
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
      {
        showModal && (
          <Modal
            title="STATUS"
            showModal={showModal}
            setShowModal={setShowModal}
          >
            {message && <h2 className="mt-6 text-center text-3xl font-extrabold text-green-500"> {message} </h2>}
            {error && <h2 className="mt-6 text-center text-3xl font-extrabold text-red-500">{error}</h2>}
          </Modal>
        )
      }
    </div>
  );
}
