import React from "react";

// const RadioButton = ({ text, name, value }) => {
//   return (
//     <label class="inline-flex items-center mt-3">
//       <input
//         type="radio"
//         className="form-radio h-5 w-5 text-gray-600"
//         name={name}
//         value={value}
//       />
//       <span class="ml-2 text-gray-800">{text}</span>
//     </label>
//   );
// };

const RadioButton = React.forwardRef((props, ref) => (
  <label className="inline-flex items-center mt-3">
    <input
      {...props}
      type="radio"
      className="form-radio h-5 w-5 text-gray-600"
      ref={ref}
    />
    <span className="ml-2 text-gray-800">{props.text}</span>
  </label>
));

export default RadioButton;
