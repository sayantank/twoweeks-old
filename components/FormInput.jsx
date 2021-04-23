import React from "react";

const FormInput = React.forwardRef((props, ref) => (
  <div className="flex flex-col space-y-1 w-full">
    <label className="text-sm text-gray-800 font-medium">{props.title}</label>
    <input
      {...props}
      ref={ref}
      className="w-full border-b-2 border-gray-200 focus:border-green-500 p-2 focus:outline-none"
    />
  </div>
  //   <div className="w-full flex flex-col space-y-1">
  //     <label htmlFor={id} className="font-serif text-sm">
  //       {title}
  //     </label>
  //     <input
  //       id={id}
  //       type={type}
  //       name={name}
  //       ref={ref}
  //       placeholder={placeholder}
  //       className="w-full px-4 py-3 border-2 border-black rounded-md flex-grow"
  //     />
  //   </div>
));

export default FormInput;
