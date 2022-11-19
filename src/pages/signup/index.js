import { useState } from "react";
// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input"
import FormAction from "../../components/design/FormAction";

import { signupFields } from "../../constants/formFields";

import axios from "axios";

export default function LoginPage() {

  // console.log(loginFields);
  const fields = signupFields;
  let fieldsState = {};
  fields?.forEach(field => fieldsState[field.id] = '');

  const [loginState, setLoginState] = useState(fieldsState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginState);
    axios.post("http://localhost:6060/faculty", loginState)
      .then((res) => {
        console.log(res);
        setError("")
        setMessage(res.data.message);
        const myTimeout = setTimeout(() => {
          setMessage("");
        }, 5000);
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
  // console.log(fields)
  return (
    <>
      <Header
        heading="Login to your account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/"
      />
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          {fields?.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
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
        <FormAction handleSubmit={handleSubmit} text="SIGNUP" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-green-500">
          {message}
        </h2>
        {error && <h2 className="mt-6 text-center text-3xl font-extrabold text-red-500">{error}</h2>}
      </form>
    </>
  );
}
