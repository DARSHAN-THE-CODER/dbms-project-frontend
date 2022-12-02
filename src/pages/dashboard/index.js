import { useState, useEffect } from "react";
// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input";
import FormAction from "../../components/design/FormAction";

import { createClass, createStudent } from "../../constants/formFields";
import axios from "axios";

import CreateClassPage from "../createClass";

import UpdateFaculty from "./updateFaculty";

import { useNavigate, Link } from "react-router-dom/dist";

export default function Dashboard() {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState(
    JSON.parse(localStorage.getItem("faculty"))
  );

  const [classes, setClasses] = useState([{}]);
  // console.log(faculty)
  useEffect(() => {
    let newObject = window.localStorage.getItem("faculty");
    // if newObject is null , then show message
    if (newObject === null) {
      navigate("/");
    }
    axios
      .get(`http://localhost:6060/class/faculty/${faculty?.facultyId}`)
      .then((res) => {
        console.log(res.data.data[0]?.Classes);
        setClasses(res.data.data[0]?.Classes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate, faculty?.facultyId]);

  function deleteClass(class2){
    axios.delete(`http://localhost:6060/class/${class2?.classCode}`)
    .then((res) => {
      console.log(res)
      setClasses(classes?.filter(item => {return (item.classCode !== class2.classCode)}))
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (
    <div className="w-full mt-2">
      <div className="flex mx-auto">
        <h2 className="text-center mx-auto my-auto text-3xl mt-5 font-extrabold text-gray-900">
          WELCOME {faculty?.firstName}
        </h2>
        <button onClick={() => { localStorage.clear(); navigate('/') }} className="bg-slate-400 p-2 rounded-lg flex-end  items-end justify-end">
          LOGOUT
        </button>
      </div>
      <hr className="w-full"></hr>
      <div className="flex flex-wrap">
        <UpdateFaculty faculty={faculty} />
        <CreateClassPage faculty={faculty} setClasses={setClasses}/>
      </div>
      <hr className="w-full h-2 "></hr>
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        MY CLASSES
      </h2>
      <div className="p-2 flex flex-wrap">
        {classes.map((class2, index) => {
          return (
            <div key={index} className="w-full p-4  m-2 shadow-xl border-2 cursor-pointer lg:max-w-lg">
              <button
                className="bg-slate-400 rounded-sm p-1"
                onClick={() => deleteClass(class2)}
              >
                delete
              </button>
              <Link to={`/class/${class2?.classCode}`}>
                <div className="space-y-2">
                  <p className="font-bold text-center">{class2?.className}</p>
                  <hr className="w-full h-2"></hr>
                  <h4 className="text-xl font-semibold">
                    SUBJECT : {class2?.subject}
                  </h4>
                  <h4 className="text-xl font-semibold">
                    CLASS CODE : {class2?.classCode}
                  </h4>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  )
}
