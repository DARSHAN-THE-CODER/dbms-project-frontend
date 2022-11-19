import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input";
import FormAction from "../../components/design/FormAction";

import { editSubmission } from "../../constants/formFields";

import EditSubmission from "./editSubmission";

export default function AssignmentDashboard() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fields = editSubmission;
  let fieldsState = {};
  fields?.forEach((field) => (fieldsState[field.id] = ""));

  useEffect(() => {
    axios
      .get(`http://localhost:6060/assignments/${id}`)
      .then((res) => {
        console.log(res.data);
        setAssignment(res.data);
        setSubmissions(res.data?.Submissions);
        // remove submissions from assignment state
        setAssignment((prev) => {
          const { Submissions, ...rest } = prev;
          return rest;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  console.log("assignment", assignment);
  console.log("submissions", submissions);

  function deleteSubmission(submission) {
    console.log(submission)
    axios
      .delete(
        `http://localhost:6060/submission/${submission?.assignmentId}/${submission?.srn}`
      )
      .then((res) => {
        console.log(res);
        setError("");
        setMessage(res.data.message);
        const myTimeout = setTimeout(() => {
          setMessage("");
        }, 5000);
        setSubmissions(submissions?.filter(item => { return (item.srn !== submission.srn)}))
        // navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err);
        setMessage("");
        setError(err.response.data.message);
        const myTimeout = setTimeout(() => {
          setError("");
        }, 5000);
      });
  }
  return (
    <>
      <hr className="w-full h-2"></hr>
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        SUBMISSIONS
      </h2>
      <hr className="w-full h-2"></hr>
      <div className="flex flex-wrap">
        {submissions?.length > 0 ? (
          submissions?.map((submission, index) => (
            <div key={index} className="border-2 rounded-lg m-3 bg-white">
              <div className="flex flex-col">
                <button
                    onClick={() => deleteSubmission(submission)}
                  className="bg-slate-400 rounded-sm p-1"
                >
                  DELETE
                </button>
                <EditSubmission key={index} submission={submission} />
              </div>
              {/* </Link> */}
            </div>
          ))
        ) : (
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            NO SUBMISSIONS
          </h2>
        )}
      </div>
    </>
  );
}
