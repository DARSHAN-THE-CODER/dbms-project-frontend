import { useState } from "react";
// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input";
import FormAction from "../../components/design/FormAction";

import { studentForm1, submissionResponse } from "../../constants/formFields";

import axios from "axios";
import StudentForm1 from "./studentForm";
export default function StudentPage() {
  
    // const [form1, setForm1] = useState()
  return (
    <>
      <StudentForm1/>
    </>
  );
}
