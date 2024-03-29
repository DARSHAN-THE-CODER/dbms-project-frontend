const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  disabled = false,
  customClass,
}) {
  let x;
  if(type === "datetime-local"){
    console.log(value)
    x= new Date(value)
    console.log(x)
    console.log(x.toDateString())
  }
  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="text-lg">
        {labelText} 
      </label>
      {type === "datetime-local" ? (x.toDateString()) : ""}
      <input
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        type={type}
        disabled={disabled}
        required={true}
        className={fixedInputClass + customClass}
        placeholder={placeholder}
      />
    </div>
  );
}
