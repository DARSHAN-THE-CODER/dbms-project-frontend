import { useState } from "react";
// components
import Header from "../../components/design/Header";
import Input from "../../components/design/Input"
import FormAction from "../../components/design/FormAction";

import { loginFields } from "../../constants/formFields";
import axios from "axios";

import { useNavigate } from "react-router-dom/dist";

export default function LoginPage() {

  const navigate = useNavigate();
  console.log(loginFields);
  const fields = loginFields;
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
    axios.get(`http://localhost:6060/faculty/${loginState.email}/${loginState.password}`)
      .then((res) => {
        console.log(res);
        setError("")
        setMessage(res.data.message);
        localStorage.setItem("faculty", JSON.stringify(res.data.data));
        navigate('/dashboard');
      }
      )
      .catch((err) => {
        console.log(err);
        setMessage("")
        setError(err.response.data.message);
        const myTimeout = setTimeout(() => {
          setError("");
      }, 5000);
      }
      )
  }
  // console.log(fields)
  return (
    <div className=" mx-auto">
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />
      <form className="mt-8 flex flex-col mx-auto max-w-md items-center justify-center  space-y-6" onSubmit={handleSubmit}>
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
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>
        <FormAction handleSubmit={handleSubmit} text="Login" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-green-500">
          {message}
        </h2>
        {error && <h2 className="mt-6 text-center text-3xl font-extrabold text-red-500">{error}</h2>}
      </form>
    </div>
  );
}
