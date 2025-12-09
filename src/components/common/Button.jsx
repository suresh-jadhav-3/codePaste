
// import React from "react";

// const Button = ({ onClick, className = "", children, disabled = false }) => {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`
//         flex items-center justify-center gap-2 px-4 py-2 rounded-md
//         bg-blue-600  hover:bg-blue-700 transition
//         disabled:opacity-50 disabled:cursor-not-allowed
//         ${className}
//       `}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;


import React from "react";

const Button = ({ onClick, className = "", children, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2 px-4 py-2 rounded-md
        transition
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
